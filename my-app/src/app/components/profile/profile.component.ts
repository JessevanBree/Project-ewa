import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";
import {AUserService} from "../../services/fb-user.service";
import {User} from "../../models/user";
import {FbSessionService} from "../../services/session/fb-session.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editProfileIsClicked: boolean = false;

  users: User[];
  private index;

  constructor(private sessionService: FbSessionService) {

    //Todo: zorgen dat voornaam, achternaam en organisatie van ingelogde persoon te zien zijn.

  }

  ngOnInit() {
  }

  onEditButtonClick() {
    this.editProfileIsClicked = true;
  }

}

