import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";
import {FbUserService} from "../../services/fb-user.service";
import {User} from "../../models/user";
import {FbSessionService} from "../../services/session/fb-session.service";
import {HttpClient} from "@angular/common/http";
import * as firebase from "firebase";

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

  constructor(private userService: FbUserService, private httpClient: HttpClient) {
    this.updateButtonToggle = true;
  }

  ngOnInit() {
    this.userId = firebase.auth().currentUser.uid;
    this.user = this.userService.loggedInUser;
    this.userCopy = User.trueCopy(this.user);
  }

  onUpdateUser() {
    let formControls = this.myProfile.controls;
    if (formControls.firstname.dirty || formControls.surname.dirty) {
      this.updateButtonToggle = true;
      this.user = this.userCopy;
      this.httpClient.put(this.DB_USERS + "/" + this.userId + ".json", this.user).subscribe(
        (user) => {
          console.log("User being sent")
        },
        error => {
          console.log(error)
        }
      )
    }
  }

}

