import { Injectable } from '@angular/core';
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userMail: string;
  isValid : boolean = false;

  constructor(private userService: UserService) { }

  signOn(eMail: string, passWord: string){
    for (let i = 0; i < this.userService.getUsers().length; i++) {
      if (eMail == this.userService.getUser(i).mail && passWord == this.userService.getUser(i).password) {
        this.userMail = eMail;
        return this.isValid = true;
      }
    }
    return this.isValid;
  }

  SignOff(){
    this.userMail = null;
    this.isValid = true;
  }
}
