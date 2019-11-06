import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {HttpClient} from "@angular/common/http";
import {FbUser} from "../models/fb-user";

@Injectable({
  providedIn: 'root'
})
export class FbUserService {
  private users: FbUser[];
  private listOfAdmins: string[];
  private readonly DB_USERS = 'https://projectewa-a2355.firebaseio.com/Users';

  constructor(private httpClient: HttpClient) {
    this.users = [];
    this.listOfAdmins = ["mohamed@hva.nl", "abdul@hva.nl", "ferran@hva.nl", "aris@hva.nl",
      "jesse@hva.nl"]
  }

  public getLoggedInUser(){
    let user: FbUser;
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].email == firebase.auth().currentUser.email){
        user = this.users[i];
      }
    }
    return user;
  }

  public saveAllUsers(){
    let user = firebase.auth().currentUser;
    let newUser;

    for (let i = 0; i < this.listOfAdmins.length; i++) {
      if(user.email == this.listOfAdmins[i]){
        newUser = new FbUser(user.email, user.metadata.creationTime, true);
        break;
      }else{
        newUser = new FbUser(user.email, user.metadata.creationTime); }
    }
    console.log(newUser);
    this.httpClient.put(this.DB_USERS + '/' + user.uid + '.json', newUser).subscribe(
      {error: err => {console.log(err)}}
    );
  }

  public getAllUsers(){
    return this.httpClient.get<FbUser[]>(this.DB_USERS + '.json').subscribe(
      (data: FbUser[]) => Object.keys(data).forEach(key => {
        this.users.push(new FbUser(data[key].email, data[key].dateCreated,
          data[key].isAdmin, key));
        console.log(this.users)
      })
    );
  }


  getUsers(){
    return this.users;
  }


}





