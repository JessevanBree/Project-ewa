import {Injectable, OnInit} from '@angular/core';
import * as firebase from "firebase";
import {AUserService} from "../fb-user.service";
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FbSessionService implements OnInit{
  public isAdmin: boolean = false;
  public displayName: string;
  token: string;
  public authenticated: boolean;
  private loggedInUser: User;

  constructor(private aUserService: AUserService) {
    this.authenticated = false;
  }

  public getLoggedInUser() {
    return this.aUserService.getLoggedInUser();
  }

  signOn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser.getIdToken().then(token => {
          this.token = token;
          sessionStorage.setItem(email, token);
          console.log("Session.key: " + sessionStorage.key(0) + "\t value:" + sessionStorage.getItem(email));
          this.aUserService.saveAllUsers();
        });
        this.authenticated = true;
        this.displayName = firebase.auth().currentUser.email;
        // this.isAdmin = this.aUserService.getLoggedInUser().isAdmin;
        return response;
      }
    )
  }

  signOff() {
    console.log("Signing out");
    this.isAdmin = false;
    this.displayName = null;
    this.authenticated = false;
    this.token = null;
    sessionStorage.clear();
    return firebase.auth().signOut();
  }

  public getTokenId() {
    return this.token;
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  get sessionStorage() {
    return sessionStorage;
  }

  ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyCihkANi0RepQRSxrqVV6N2GZ9hkgico8A",
      authDomain: "projectewa-a2355.firebaseapp.com",
      databaseURL: "https://projectewa-a2355.firebaseio.com",
      projectId: "projectewa-a2355",
      storageBucket: "projectewa-a2355.appspot.com",
      messagingSenderId: "115134291690",
      appId: "1:115134291690:web:30baf3d606f6bcc4308193",
      measurementId: "G-PDGQZH7H4X"
    };
    // Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	this.aUserService.getLoggedInUser().then((user) => {
		this.loggedInUser = user;
	})
  }


}
