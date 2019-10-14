import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

// services
import {AUserService} from "../../services/a-user.service";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isValidCredentials: boolean;

  @ViewChild("formElement", {static: false}) editForm: NgForm;

  constructor(private userService: AUserService,
              private sessionService: SessionService,
              private route: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // check if email == any user in getUsers()
    this.isValidCredentials = true;
    this.activeRoute.queryParams.subscribe(
      (params: Params) => {
        console.log(params['isValidCredentials']);
      }
    )
  }

  onLogin() {
    if (this.sessionService.signOn(this.email, this.password)){
      this.isValidCredentials = true;
      return this.route.navigate([''], {queryParams: {isValidCredentials: this.isValidCredentials}})
    }
    this.isValidCredentials = false;
    return this.route.navigate([], {queryParams: {isValidCredentials: this.isValidCredentials}})
  }

}
