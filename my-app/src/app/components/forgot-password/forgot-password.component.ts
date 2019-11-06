import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isValidCredentials: boolean;
  email: string;

  constructor(private userService: UserService) {
    this.isValidCredentials = true;
  }

  onResetPassword(){
    //Logic to reset password

    let exists = 0;
    //Check if email exists, if so set isValidCredentials to true
    for (let i = 0; i < this.userService.getUsers().length; i++) {
      if (this.userService.getUsers()[i].mail == this.email){
        exists++;
      }
    }
    //Email exists if 'exists' == 1
    if (exists == 1){
      this.isValidCredentials = true;
      alert("A link to re-issue your password has been sent to your email.");
      return true;
    } else {
      this.isValidCredentials = false;
      return false;
    }
  }

  inputChanged(email: string) {
    this.email = email;
  }


  ngOnInit() {
  }

}
