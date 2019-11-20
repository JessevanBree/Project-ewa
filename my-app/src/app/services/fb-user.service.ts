import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class FbUserService {
  private users: User[];
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
		console.log(user);
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
        next: user => {console.log(user)},
        error: err => { console.log(err) } }
		);
	}

	public saveOrCreateUser(editedUser: User) {
		let userId = editedUser.userId;
		delete editedUser.userId;

		if (userId == null) {
			firebase.auth().createUserWithEmailAndPassword(
				editedUser.email,
				editedUser.password
			)
				.then(function (userRecord) {
				  console.log("UserRecord: " + userRecord);
					// See the UserRecord reference doc for the contents of userRecord.
					this.httpClient.put(this.DB_USERS + '/' + userRecord.user.uid + '.json', editedUser).subscribe(
						{ error: err => { console.log(err) } }
					);
				})
				.catch(function (error) {
					console.log('Error creating new user:', error);
				});
		} else {
			this.httpClient.put(this.DB_USERS + '/' + userId + '.json', editedUser).subscribe(
				{ error: err => { console.log(err) } }
			);
		}
		// this.getAllUsers();
	}

	public getAllUsers() {
		return this.httpClient.get<User[]>(this.DB_USERS + '.json').subscribe(
			(data) => {
				Object.keys(data).forEach(key => {
					this.users.push(new User(key, data[key].email, data[key].password, data[key].isAdmin,
            data[key].firstName, data[key].surName, data[key].organisation));
					// console.log(this.users)
				})
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
