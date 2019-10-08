import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

// services
import {AUserService} from "../../services/a-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  isValidCredentials: boolean;

  @ViewChild("formElement", {static: false}) editForm: NgForm;

  constructor(private userService: AUserService,
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
    for (let i = 0; i < this.userService.getUsers().length - 1; i++) {
      if (this.email == this.userService.getUser(i).mail && this.password == this.userService.getUser(i).password) {
        this.isValidCredentials = true;
        return this.route.navigate(['admin'], {queryParams: {email: this.email}})
      }
    }
    this.isValidCredentials = false;
    return this.route.navigate([], {queryParams: {isValidCredentials: this.isValidCredentials}})
  }

}
