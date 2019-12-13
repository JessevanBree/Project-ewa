import {Injectable, OnInit} from '@angular/core';
import {Organisation} from "../models/organisation";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminOrganisationService {

  private readonly REST_URL = "http://localhost:8080/organisations";

  // URL to temporary get all the users
  private readonly TEMP_USER_URL = "http://localhost:8080/users";

  orgMembers: User[];

  organisationOfAdmin: Organisation;

  constructor(private httpClient: HttpClient) {
    this.orgMembers = [];
    this.getAllMembers();
  }

  // Function to delete a user from the organisation
  deleteUserFromOrganisation(member: User): Observable<{}> {
    let userId = member.userId;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    const url = `${this.REST_URL}/${userId}`;
    return this.httpClient.delete(url + httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Temporary gets all the members from spring boot backend
  getAllMembers() {
    return this.httpClient.get<User[]>(this.TEMP_USER_URL);
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
