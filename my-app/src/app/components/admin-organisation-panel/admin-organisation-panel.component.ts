import {Component, OnInit} from '@angular/core';
import {Organisation} from "../../models/organisation";
import {Dataset} from "../../models/dataset";
import {AdminOrganisationService} from "../../services/admin-organisation.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganisationService} from "../../services/organisation.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin-organisation-panel',
  templateUrl: './admin-organisation-panel.component.html',
  styleUrls: ['./admin-organisation-panel.component.css']
})
export class AdminOrganisationPanelComponent implements OnInit {

  // The current selected organisation in the panel
  private currentSelectedOrg: Organisation;
  // All the orgs managed by the logged in org admin
  private userOrganisations: Organisation[];
  // List of members of the current org
  private members: User[];

  private userIsAdminOfOrgs: boolean;

  private addMemberToggle: boolean;
  private createMemberToggle: boolean;

  searchFilter: String;
  private emptyList: boolean;

  constructor(private organisationService: OrganisationService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {

    this.members = [];
    this.userOrganisations = [];
    this.userIsAdminOfOrgs = false;

    this.addMemberToggle = false;
    this.createMemberToggle = false;
  }

  // Is called when an organisation has been added from the modal (to refresh the members list)
  onAddedRequest(user: User) {
    // Update the view org first
    this.currentSelectedOrg.users.push(user);
    this.members = this.currentSelectedOrg.users;
    // Updates the organisation service which in turn updates the database
    this.organisationService.addMemberToOrg(this.currentSelectedOrg.id, user.id);
  }

  // This function is called when another organisation has been selected in the dropdown box
  orgSelectionChanged() {
    // Empty and fill the new members array
    console.log(this.currentSelectedOrg);
    this.members = [];
    this.userIsAdminOfOrgs = this.currentSelectedOrg.organisationAdmin.id == this.userService.getLoggedInUser().id;
    this.currentSelectedOrg.users.forEach(u => {
      this.members.push(u)
    });
  }

  // Function to delete a member from the organisation
  onDelete(member: User) {
    console.log("Current selected org: " + this.currentSelectedOrg.name);
    if (confirm("Are you sure to delete this member with the following email " + member.email + " from the following organisation " + this.currentSelectedOrg.name)) {
      this.currentSelectedOrg.users = this.members.filter(u => u.id != member.id);
      this.organisationService.deleteMemberFromOrg(this.currentSelectedOrg.id, member.id);
      this.orgSelectionChanged();
      console.log("Member has successfully been removed from the organisation");
    }
  }

  // Called when the add existing modal has been closed
  onCloseReq() {
    console.log("Closing modal..");
    this.addMemberToggle = false;
  }

  // Called when the create modal has been closed
  onCloseReqCreate() {
    console.log("Closing modal..");
    setTimeout(() => {
      this.orgSelectionChanged();
    }, 100);
    this.createMemberToggle = false;
  }

  onCreateNewMember() {
    console.log("Opening modal..");
    this.createMemberToggle = true;
  }

  onAddNewMember() {
    console.log("Opening modal..");
    this.addMemberToggle = true;
  }

  checkIfListEmpty(): void {
    if (this.members.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("list-group-item p-1").length == 0;
    }, 5)
  }

  ngOnInit() {
    this.organisationService.getMyOrganisations().subscribe(
      (data: Organisation[]) => {
        console.log(data);
        this.userOrganisations = data;
        this.currentSelectedOrg = this.userOrganisations[0];
      },
      error => { console.log(error) },
      () => {
        if(this.currentSelectedOrg) {
          this.currentSelectedOrg.users.forEach(u => this.members.push(u));
          this.userIsAdminOfOrgs = this.currentSelectedOrg.organisationAdmin.id == this.userService.getLoggedInUser().id;
          console.log(this.currentSelectedOrg.organisationAdmin, this.userService.getLoggedInUser());
          console.log("Finished retrieving user's organisations");
        }
      }
    );

  }
}
