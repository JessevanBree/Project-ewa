import {Component, OnInit} from '@angular/core';
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

  private editProfileIsClicked: boolean;
  private userId: string;
  protected user: User;
  protected userCopy: User;

  private readonly DB_URL = 'https://projectewa-a2355.firebaseio.com';
  private readonly DB_USERS = this.DB_URL + '/Users';

  constructor(private userService: FbUserService, private httpClient: HttpClient) {
    this.editProfileIsClicked = false;
  }

  ngOnInit() {
    this.userId = firebase.auth().currentUser.uid;
    this.user = this.userService.getLoggedInUser();
    this.userCopy = User.trueCopy(this.user);
  }

  onEditButtonClick() {
    this.editProfileIsClicked = true;
  }

  onUpdateUser() {
    this.user = this.userCopy;
    this.httpClient.put(this.DB_USERS + "/" + this.userId  + ".json", this.user).subscribe(
      (user) => {
        console.log("User being sent")
      },
      error => {
        console.log(error)
      }
    )
  }

}

