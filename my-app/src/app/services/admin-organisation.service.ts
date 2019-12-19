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
  private readonly REST_ORG_USERS_URL = "http://localhost:8080/organisations/orgMembers";
  private readonly REST_ADMIN_ORGS = "http://localhost:8080/users/adminOrgs";

  private organisations: Organisation[];
  orgMembers: User[];

  constructor(private httpClient: HttpClient, private sessionService: SpringSessionService) {
    this.orgMembers = [];
    this.organisations = [];

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

  // Temporary gets all the members from spring boot backend
  getOrgMembers(org: Organisation) {
    let orgId = org.id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    const url = `${this.REST_ORG_USERS_URL}/${orgId}`;

    return this.httpClient.get<User[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Function to delete a user from the organisation
  deleteUserFromOrganisation(org: Organisation, member: User) {
    let userId = member.id;
    let orgId = org.id;

    const url = `${this.REST_URL}/${orgId}/${userId}`;
    return this.httpClient.delete(url)
      .pipe(
        catchError(this.handleError)
      );
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
