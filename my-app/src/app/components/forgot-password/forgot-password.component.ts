import { Component, OnInit } from '@angular/core';
import {FbUserService} from "../../services/fb-user.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isValidCredentials: boolean;
  email: string;

  constructor(private aUserService: FbUserService) {
    this.isValidCredentials = true;
  }

  onResetPassword(){
    /* Logic to check if the email exists in the application*/

    // let exists = 0;
    // console.log("CURRENT USER EMAIL = " + this.email);
    //
    // console.log("Length of database users: " + this.aUserService.getUsers().length);
    //
    // //Check if email exists, if so set isValidCredentials to true
    // for (let i = 0; i < this.aUserService.getUsers().length; i++) {
    //   if (this.aUserService.getUsers()[i].email == this.email){
    //     console.log(" Emails from firebase: " + this.aUserService.getAllUsers()[i]);
    //     exists++;
    //   }
    // }
    // //Email exists if 'exists' == 1
    // if (exists == 1){
    //   this.isValidCredentials = true;
    //   alert("A link to re-issue your password has been sent to your email.");
    //   return true;
    // } else {
    //   console.log("Email does not exist");
    //   this.isValidCredentials = false;
    //   return false;
    // }

    //Logic to send the email

  }

  //When the user types in the email, save it in the email instance variable
  inputChanged(email: string) {
    this.email = email;
  }

  ngOnInit() {
  }

}
