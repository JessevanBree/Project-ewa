import { Component, OnInit } from '@angular/core';
import {Organisation} from "../../models/organisation";
import {Dataset} from "../../models/dataset";
import {AdminOrganisationService} from "../../services/admin-organisation.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-admin-organisation-panel',
  templateUrl: './admin-organisation-panel.component.html',
  styleUrls: ['./admin-organisation-panel.component.css']
})
export class AdminOrganisationPanelComponent implements OnInit {

  // Organisation of the current selected organisation by the admin
  private currentSelectedOrg: Organisation;

  // All the orgs managed by the logged in org admin
  private organisations: Organisation[];

  // List of members of the current org
  private members: User[];

  private addMemberToggle: boolean;

  constructor(private adminOrganisationService: AdminOrganisationService) {
    // Fill the members array with all the users stored in spring boot backend
    this.members = [];
    this.organisations = [];

    this.addMemberToggle = false;
  }

  // Temp function
  selectOption(org: Organisation){

  }

  // Function to delete a member from the organisation
  onDelete(member: User) {
    console.log("Current selected org: " + this.currentSelectedOrg.name);
    if (confirm("Are you sure to delete this member with the following email (Member email)?")) {

      this.adminOrganisationService.deleteUserFromOrganisation(member);
      console.log("Member has succesfully been removed from the organisation");
    }
  }

  // This method is called when the modal is being closed
  onCloseReq() {
    console.log("Closing modal..");
    this.addMemberToggle = false;
  }

  // This function is called when the user clicks on the "add member" button to open the modal
  onAddNewMember(){
    console.log("Add new member button is clicked");
    this.addMemberToggle = true;
  }

  ngOnInit() {
    // Fill the organisations array for the selectbox
    this.adminOrganisationService.getAllOrganisations().subscribe(
        (data: Organisation[]) => {
          data.map(o => {
            o ? this.organisations.push(o) : [];
            console.log(o);
          });
        }
      );

    this.currentSelectedOrg = this.organisations[0];

    // Fill the members array
    this.adminOrganisationService.getAllMembers().subscribe(
      (data: User[]) => {
        console.log(data);
        data.map(o => {
          o ? this.members.push(o) : []
        });
      }
    );
  }
}
