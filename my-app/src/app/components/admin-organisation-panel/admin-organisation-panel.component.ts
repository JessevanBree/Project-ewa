import { Component, OnInit } from '@angular/core';
import {Organisation} from "../../models/organisation";
import {Dataset} from "../../models/dataset";
import {AdminOrganisationService} from "../../services/admin-organisation.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-organisation-panel',
  templateUrl: './admin-organisation-panel.component.html',
  styleUrls: ['./admin-organisation-panel.component.css']
})
export class AdminOrganisationPanelComponent implements OnInit {

  private currentSelectedOrg: Organisation;

  // All the orgs managed by the logged in org admin
  private organisations: Organisation[];

  // List of members of the current org
  private members: User[];

  private userIsAdminOfOrgs: boolean;

  private addMemberToggle: boolean;
  private createMemberToggle: boolean;

  constructor(private adminOrganisationService: AdminOrganisationService, private router: Router,
              private route: ActivatedRoute,) {

    this.members = [];
    this.organisations = [];
    this.userIsAdminOfOrgs = false;

    this.addMemberToggle = false;
    this.createMemberToggle = false;
  }

  // This method is called when another organisation has been selected in the selectbox
  organisationChanged(){
    // Empty and fill the new members array
    this.members = [];
    this.adminOrganisationService.getOrgMembers(this.currentSelectedOrg).subscribe(
      (data: User[]) => {
        console.log(data);
        data.map(o => {
          o ? this.members.push(o) : [];
        });
      }
    );
  }

  // Function to delete a member from the organisation
  onDelete(member: User) {
    console.log("Current selected org: " + this.currentSelectedOrg.name);
    if (confirm("Are you sure to delete this member with the following email " + member.email + " from the following organisation " + this.currentSelectedOrg.name)) {
      this.adminOrganisationService.deleteUserFromOrganisation(this.currentSelectedOrg, member);
      console.log("Member has succesfully been removed from the organisation");
    }
  }

  // Called when modals are being close
  onCloseReq() {
    console.log("Closing modal..");
    this.addMemberToggle = false;
  }

  // Called when onclick button
  onCreateNewMember(){
    this.createMemberToggle = true;
  }

  // Called when onclick button
  onAddNewMember(){
    console.log("Add new member button is clicked");
    this.addMemberToggle = true;
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        // Fill the organisations array for the selectbox
        this.adminOrganisationService.getAllOrganisations().subscribe(
          (data: Organisation[]) => {
            data.map(o => {
              o ? this.organisations.push(o) : [];
              this.currentSelectedOrg = this.organisations[0];
              this.userIsAdminOfOrgs = true;
              console.log(o);
            });
            this.organisationChanged();
          }
        );
      });

    // this.organisationChanged();
  }
}
