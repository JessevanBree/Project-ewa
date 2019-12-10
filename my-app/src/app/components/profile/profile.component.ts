import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";
import {FbUserService} from "../../services/fb-user.service";
import {User} from "../../models/user";
import {FbSessionService} from "../../services/session/fb-session.service";
import {HttpClient} from "@angular/common/http";
import * as firebase from "firebase";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private userId: string;
  protected user: User;
  protected userCopy: User;

  protected updateButtonToggle: boolean;

  private readonly DB_URL = 'https://projectewa-a2355.firebaseio.com';
  private readonly DB_USERS = this.DB_URL + '/Users';

  @ViewChild('myProfile', {static: false}) myProfile;

  constructor(private userService: FbUserService, private httpClient: HttpClient, private firebaseDatasetService: FirebaseDatasetService) {
    this.updateButtonToggle = true;
  }

  ngOnInit() {
    this.userId = firebase.auth().currentUser.uid;
    this.user = this.userService.getLoggedInUser();
    this.userCopy = User.trueCopy(this.user);

    if (!this.user.firstName || !this.user.surName){
      this.updateButtonToggle = false;
    }

    console.log("User firstname = " + this.user.firstName);
    console.log("User surname = " + this.user.surName);

    console.log("UserCopy firstname = " + this.userCopy.firstName);
    console.log(this.userCopy.firstName);
    console.log("UserCopy surname = " + this.userCopy.surName);
  }

  onUpdateUser() {
    let formControls = this.myProfile.controls;
    if (formControls.firstname.dirty || formControls.surname.dirty || !(this.user.firstName === this.userCopy.firstName) ||
      !(this.user.surName === this.userCopy.surName)) {
      this.user = this.userCopy;
      this.httpClient.put(this.DB_USERS + "/" + this.userId + ".json", this.user).subscribe(
        (user) => {
          console.log("User being sent")
        },
        error => {
          console.log(error)
        },
        () => {
          this.user = User.trueCopy(this.userCopy);
          this.updateButtonToggle = true;
        }
      )
    }
  }

}

