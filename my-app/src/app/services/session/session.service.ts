import { Injectable } from '@angular/core';
import {UserService} from "../user.service";

@Injectable({
	providedIn: 'root'
})
export class SessionService {
	userMail: string;
	isAdmin: Boolean;
	isValid: boolean = false;

  constructor(private userService: UserService) { }

	signOn(eMail: string, passWord: string) {
		for (let i = 0; i < this.userService.getUsers().length; i++) {
			let user = this.userService.getUser(i);
			if (eMail == user.mail && passWord == user.password) {
				this.userMail = eMail;
				this.isAdmin = user.isAdmin; 
				return this.isValid = true;
			}
		}
		return this.isValid;
	}

	SignOff() {
		this.userMail = null;
		this.isValid = true;
		this.isAdmin = false;
	}
}
