import {Injectable} from '@angular/core';
//Models
import {User} from 'src/app/models/user';
import {Organisation} from 'src/app/models/organisation';
import {SUR_NAMES} from 'src/app/models/testData';
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private readonly REST_ORGANISATIONS_URL = "http://localhost:8080/organisations";
  private organisations: Organisation[];
  private _myOrganisations: Organisation[];

  constructor(private userService: UserService,
              private http: HttpClient) {
    this.organisations = [];
    this._myOrganisations = [];

    this.getAllOrganisations().subscribe(
      (organisations: Organisation[]) => {
        this.organisations = organisations;
      },
      (error) => console.log("Error when retrieving Organisations: " + error),
      () => {
        console.log("All Organisations are retrieved correctly!");

        this.userService.getLoggedInUser().organisationsList = [this.organisations[0], this.organisations[1]];
      }
    )
    ;
  }

  public getAllOrganisations(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>(this.REST_ORGANISATIONS_URL);
  }

  getOrganisation(index: number): Organisation {
    return this.organisations[index];
  }

  public deleteOrganisation(org: Organisation): Boolean {
    let orgIndex: number = this.organisations.indexOf(org);
    if (orgIndex != -1) {
      this.organisations.splice(orgIndex, 1);
      return this.organisations[orgIndex].equals(org);
    } else {
      return;
    }
  }

  public addOrganisation(org: Organisation): Boolean {
    this.organisations.push(org);
    return this.organisations[this.organisations.length - 1].equals(org);
  }

  public updateOrganisation(index: number, org: Organisation): Boolean {
    if (!this.organisations[index] || !org) return false;

    this.organisations[index] = org;
    return this.organisations[index].equals(org);
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
