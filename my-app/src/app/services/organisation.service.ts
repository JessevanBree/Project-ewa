import {Injectable} from '@angular/core';
//Models
import {User} from 'src/app/models/user';
import {Organisation} from 'src/app/models/organisation';
import {SUR_NAMES} from 'src/app/models/testData';
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SpringSessionService} from "./session/spring-session.service";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private readonly REST_ORGANISATIONS_URL = "http://localhost:8080/organisations";
  private organisations: Organisation[];
  private _myOrganisations: Organisation[];

  constructor(private userService: UserService,
              private http: HttpClient, private sessionService: SpringSessionService) {
    this.organisations = [];
    this._myOrganisations = [];

    this.getAllOrganisations().subscribe(
      (organisations: Organisation[]) => {
        this.organisations = organisations;
      },
      (error) => console.log("Error when retrieving Organisations: " + error),
      () => {
        console.log("All Organisations are retrieved correctly!");


        this.sessionService.getUser().organisations = [this.organisations[0], this.organisations[1]];

      }
    );
  }

  public getAllOrganisations(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.REST_ORGANISATIONS_URL);
  }

  getOrganisation(index: number): Organisation {
    return this.organisations[index];
  }



  public addOrganisation(org: Organisation) {
    /*this.organisations.push(org);
    return this.organisations[this.organisations.length - 1].equals(org);*/
    this.http.post(this.REST_ORGANISATIONS_URL, org).subscribe(
      (data: Organisation) => {
        console.log(data);
        this.organisations.push(data);
      },
      error => console.log(error),
      () => {
        console.log("Finished posting organisation");
      }
    );
    console.log(this.organisations);
  }

  // Not recommended to use because it can cause json parse errors due to recursion
  public updateOrganisation(index: number, org: Organisation) {
    if (!this.organisations[index] || !org) return false;
    /*this.organisations[index] = org;
    return this.organisations[index].equals(org);*/
    this.http.put(this.REST_ORGANISATIONS_URL, org).subscribe(
      (data: Organisation) => {
        this.organisations[index] = data;
        console.log(index, this.organisations[index]);
        console.log(this.organisations);
      },
      error => console.log(error),
      () => {
        console.log("Finished updating organisation");
      }
    );
  }

  public deleteOrganisation(org: Organisation) {
    this.organisations = this.organisations.filter(o => o.id != org.id);
    this.http.delete(this.REST_ORGANISATIONS_URL + "/" + org.id).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Finished deleting organisation from database");
      }
    )
  }

  // Updates or changes the organisation admin user and can change the name of the organisation
  public updateOrgAdminUserAndName(orgId: number, userId: number, orgName?:string){
    this.http.put(this.REST_ORGANISATIONS_URL + "/" + orgId + "?user=" + userId + "&name=" + orgName, null)
      .subscribe(
        response => console.log(response),
        error => console.log(error),
        () => console.log("Updated organisation: ", orgId)
      );
  }

  public addMemberToOrg(orgId: number, userId: number){
    this.http.post(this.REST_ORGANISATIONS_URL + "/" + orgId +  "/" + userId, null).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error),
      () => {
        console.log("Finished adding user to organisation");
      }
    );
  }

  public deleteMemberFromOrg(orgId: number, userId: number){
    this.http.delete(this.REST_ORGANISATIONS_URL + "/" + orgId + "/" + userId).subscribe(
      response => console.log(response),
      error => console.log(error),
      () => console.log("Finished deleting member from organisation")
    );
  }

  getOrganisations(): Organisation[] {
    return this.organisations;
  }

  get myOrganisations(): Organisation[] {
    // let myOrgs = [];
    // if (this.userService.getLoggedInUser().organisation) {
    //   for (let i = 0; i < this.organisations.length; i++) {
    //     for (let j = 0; j < this.userService.getLoggedInUser().organisationsList.length; j++) {
    //       if (this.organisations[i].id === this.userService.getLoggedInUser().organisationsList[j].id) {
    //         myOrgs.push(this.organisations[i]);
    //       }
    //     }
    //   }
    // }
    // return myOrgs;

    return this._myOrganisations;
  }

  genRandomOrganisation(): Organisation {
    let user: User = this.userService.getUsers()[Math.floor(Math.random() * this.userService.getUsers().length)]
    return new Organisation(SUR_NAMES[Math.floor(Math.random() * SUR_NAMES.length)].toLowerCase() + " & Co", user);
  }
}
