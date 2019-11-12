import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { HttpClient } from "@angular/common/http";
import { FbUser } from "../models/fb-user";

@Injectable({
	providedIn: 'root'
})
export class FbUserService {
	private users: FbUser[];
	private listOfAdmins: string[];
	private readonly DB_URL = 'https://projectewa-a2355.firebaseio.com';
	private readonly DB_USERS = this.DB_URL + '/Users';

	constructor(private httpClient: HttpClient) {
		this.users = [];
		this.listOfAdmins = ["mohamed@hva.nl", "abdul@hva.nl", "ferran@hva.nl", "aris@hva.nl",
			"jesse@hva.nl"]
		// Password for admins and test users: testing
	}

	public getLoggedInUser() {
		let user: FbUser;
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i].email == firebase.auth().currentUser.email) {
				user = this.users[i];
			}
		}
		return user;
	}

	public saveAllUsers() {
		let user = firebase.auth().currentUser;
		let newUser;

		// console.log("HHAHA: " + user.metadata.creationTime);
		for (let i = 0; i < this.listOfAdmins.length; i++) {
			// && user.email != "abdul@hva.nl" is only to demonstrate that no admin users cannot
			if (user.email == this.listOfAdmins[i]) {
				newUser = new FbUser(user.email, user.metadata.creationTime, true);
				break;
			} else {
				newUser = new FbUser(user.email, user.metadata.creationTime, false);
			}
		}
		// console.log(newUser);
		this.httpClient.put(this.DB_USERS + '/' + user.uid + '.json', newUser).subscribe(
			{ error: err => { console.log(err) } }
		);
	}

	public getAllUsers() {
		return this.httpClient.get<FbUser[]>(this.DB_USERS + '.json').subscribe(
			(data: FbUser[]) => Object.keys(data).forEach(key => {
				this.users.push(new FbUser(data[key].email, data[key].dateCreated,
					data[key].isAdmin, key));
				// console.log(this.users)
			})
		);
	}

	public deleteUser(user: FbUser): void {
		this.users.splice(this.users.indexOf(user), 1);
		this.httpClient.delete<FbUser>(this.DB_USERS + '/' + user.userId + '.json').subscribe(
			(data) => {
				console.log('success');
			},
			(err) => {
				console.log(err);
			}
		)
	}

	getUsers() {
		return this.users;
	}
}