import {Injectable, OnInit} from '@angular/core';
import {Organisation} from "../models/organisation";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {SpringSessionService} from "./session/spring-session.service";

@Injectable({
  providedIn: 'root'
})
export class AdminOrganisationService {

  private readonly REST_URL = "http://localhost:8080/organisations";

  private readonly REST_USER_URL = "http://localhost:8080/users";

  private readonly REST_ADMIN_ORGS = "http://localhost:8080/users/adminOrgs";

  private loggedInUser: User;

  private organisations: Organisation[];
  orgMembers: User[];

  constructor(private httpClient: HttpClient, private sessionService: SpringSessionService) {
    this.orgMembers = [];
    this.organisations = [];

    // console.log(" LOGGED IN USER ID: " + sessionService.getUser().id); // Getting id works
    //
    // this.getAllOrganisations();
    //
    // this.getAllMembers();
  }

  // Function to get all organisations that the logged in user is administrator of
  getAllOrganisations(){
    let loggedInUserId = this.sessionService.getUser().id;

    console.log("Logged in user ID: " + loggedInUserId);

    const url = `${this.REST_ADMIN_ORGS}/${loggedInUserId}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    return this.httpClient.get<Organisation[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function to delete a user from the organisation
  deleteUserFromOrganisation(member: User): Observable<{}> {
    let userId = member.id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    const url = `${this.REST_URL}/${userId}`;
    return this.httpClient.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Temporary gets all the members from spring boot backend
  getOrgMembers() {
    return this.httpClient.get<User[]>(this.REST_USER_URL);
  }

  // Method to handle the HTTP errors
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
