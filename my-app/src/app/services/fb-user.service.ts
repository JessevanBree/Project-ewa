import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
	providedIn: 'root'
})
export class FbUserService {
	public users: User[];
	private listOfAdmins: string[];

	private readonly DB_URL = 'https://projectewa-a2355.firebaseio.com';
	private readonly DB_USERS = this.DB_URL + '/Users';


	constructor(private httpClient: HttpClient) {
		this.users = [];
		this.listOfAdmins = ["mohamed@hva.nl", "abdul@hva.nl", "ferran@hva.nl", "aris@hva.nl",
			"jesse@hva.nl"];
		// Password for admins and test users: testing
	}

	public getLoggedInUser() {
		let user: User;
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i].email === firebase.auth().currentUser.email) {
				user = this.users[i];
				break;
			}
		}
		return user;
	}

	// Saves all the changes to the user array users
	public saveAllUsers() {
		this.users.forEach(user => {
			// console.log(user);
			this.saveOrCreateUser(user);
		});
	}

	public saveLoggedInUser() {
		let user = firebase.auth().currentUser;
		let newUser;

		// Loops through users
		for (let i = 0; i < this.listOfAdmins.length; i++) {

			if (user.email == this.listOfAdmins[i]) {
				// If user is an admin
				newUser = new User(user.uid, user.email, null, true);
				break;
			} else {
				// If user is not an admin
				newUser = new User(user.uid, user.email, null, false);
			}
		}

		this.httpClient.put(this.DB_USERS + '/' + user.uid + '.json', newUser).subscribe(
			{
				next: user => { console.log(user) },
				error: err => { console.log(err) }
			}
		);
	}

	public saveOrCreateUser(editedUser: User, index? : number) {
		// console.log("editedUser", editedUser)
		let _this = this;
		let userId = editedUser.userId;
		editedUser.dateEdited = new Date(Date.now());

		if (userId == null) {
			firebase.auth().createUserWithEmailAndPassword(
				editedUser.email,
				editedUser.password
			).then(function (userRecord) {
				// See the UserRecord reference doc for the contents of userRecord.
				delete editedUser.userId;
				_this.httpClient.put(_this.DB_USERS + '/' + userRecord.user.uid + '.json', editedUser).subscribe(
					(data) => {
						editedUser.userId = userId;
						_this.users.push(editedUser);
					},
					(err) => {
						console.log(err)
					}
				);
			}).catch(function (error) {
				console.log('Error creating new user:', error);
			});
		} else {
			// firebase.auth().update
			delete editedUser.userId;
			_this.httpClient.put(_this.DB_USERS + '/' + userId + '.json', editedUser).subscribe(
				(data) => {
					editedUser.userId = userId;

					if(index) {
						_this.users[index] = editedUser;
					} else {
						
						let indexOf = _this.users.findIndex((u) => {
							u.userId == editedUser.userId
						})
						if(indexOf == -1){
							console.log("????", editedUser); 
							return;
						}
						_this.users[indexOf] = editedUser;
					}

				},
				(err) => {
					console.log(err)
				}
			);
		}
	}

	public getAllUsers() {
		return this.httpClient.get<User[]>(this.DB_USERS + '.json').subscribe(
			(data) => {
				Object.keys(data).forEach(key => {
					this.users.push(new User(key, data[key].email, data[key].Password, data[key].isAdmin,
						data[key].firstName, data[key].surName, data[key].organisation));
				});
			}
		);
	}

	public deleteUser(user: User): void {
		this.users.splice(this.users.indexOf(user), 1);
		this.httpClient.delete<User>(this.DB_USERS + '/' + user.userId + '.json').subscribe(
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
