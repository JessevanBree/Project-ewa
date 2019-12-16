import { Injectable } from '@angular/core';
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
    return this.loggedInUser
  }

  public getAllUsers() {
    return this.httpClient.get<User[]>(this.REST_USERS_URL);
  }

  getUsers() {
    return this.users;
  }

  public deleteUser(user: User): void {

  }


}
