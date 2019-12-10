import {Injectable, OnInit} from '@angular/core';
import {Organisation} from "../models/organisation";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminOrganisationService {

  private readonly REST_URL = "http://localhost:8080";

  // URL to temporary get all the users
  private readonly TEMP_USER_URL = "http://localhost:8080/users";

  orgMembers: User[];

  organisationOfAdmin: Organisation;

  constructor(private httpClient: HttpClient) {
    this.orgMembers = [];
    this.getAllMembers();
  }

  getOrgMembers() {
    return this.orgMembers;
  }

  // Temporary gets all the members from spring boot backend
  getAllMembers() {
    return this.httpClient.get<User[]>(this.TEMP_USER_URL);
  }
}
