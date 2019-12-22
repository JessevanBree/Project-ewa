import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[];
  private listOfAdmins: string[];
  private loggedInUser: User;

  private readonly REST_USERS_URL = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {
    this.users = [];
    this.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      error => {
        console.log(error)
      },
      () => {
        console.log("Finished retrieving users");
      }
    )

  }

  public setLoggedInUser(user: User): void {
    this.loggedInUser = user;
  }

  public getLoggedInUser(): User {
    // console.log(this.loggedInUser);
    if (this.loggedInUser == null || undefined) {
      // console.log(this.loggedInUser + " als user is null or undefined");
      console.log(this.getUserByEmail(sessionStorage.getItem("userEmail")));
      this.loggedInUser = this.getUserByEmail(sessionStorage.getItem("userEmail"));
      console.log(this.loggedInUser);
    }
    return this.loggedInUser;
  }

  public getAllUsers() {
    return this.httpClient.get<User[]>(this.REST_USERS_URL);
  }

  public deleteUser(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
    return this.httpClient.delete(this.REST_USERS_URL + "/" + user.id);
  }

  public saveUser(user: User) {
    return this.httpClient.put(this.REST_USERS_URL, user);
  }

  public createUser(user: User) {
    return this.httpClient.post(this.REST_USERS_URL, user);
  }

  public getUserByEmail(email: string): User {
    // console.log(this.users);
    // console.log(email);
    // console.log(this.users.find(user => user.email === email));
    return this.users.find(user => user.email === email);
  }

  public getUserById(id: number): User {
    return this.users.find(user => user.id == id);
  }

  getUsers() {
    return this.users;
  }

}
