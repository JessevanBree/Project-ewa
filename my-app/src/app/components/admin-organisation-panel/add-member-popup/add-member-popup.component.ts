import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {AdminOrganisationService} from "../../../services/admin-organisation.service";
import {OrganisationService} from "../../../services/organisation.service";

@Component({
  selector: 'app-add-member-popup',
  templateUrl: './add-member-popup.component.html',
  styleUrls: ['./add-member-popup.component.css']
})
export class AddMemberPopupComponent implements OnInit {

  @Output() closingToggle: EventEmitter<boolean>;
  // @Output() userAdded = new EventEmitter<User>();
  @Output() userAdded: EventEmitter<User>;
  @Input() private receivedSelectedOrg: Organisation;

  private users: User[];

  searchFilter: String;

  private orgMembers: User[]; // All the members of the current selected organisation

  private emptyList: boolean;

  constructor(private userService: UserService, private adminOrganisationService: AdminOrganisationService,
              private organisationService: OrganisationService) {
    this.closingToggle = new EventEmitter<boolean>();
    this.userAdded = new EventEmitter<User>();

    this.users = [];
  }

  // Called when the org admin clicks on a user to add the user to the org
  userSelected(user: User){

        // Check if user already exists in the organisation
        // TODO: does not work yet for some reason
        this.adminOrganisationService.getOrgMembers(this.receivedSelectedOrg);
        for (let i = 0; i < this.adminOrganisationService.orgMembers.length ; i++) {
          if (this.adminOrganisationService.orgMembers[i].email == user.email){
            alert("Error, selected user " + user.email + " is already in the organisation");
            throw new Error();
          }
        }

        if (confirm("Are you sure to add the following user: " + user.email)) {
          this.userAdded.emit(user);

    } else {
      alert("Adding new member has been canceled");
    }

    this.closingToggle.emit(true);
  }

  checkIfListEmpty(): void {
    if(this.users.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("org-admin-user-item").length == 0;
    }, 5)
  }

  ngOnInit() {
    this.users = this.userService.getUsers();

    this.orgMembers = [];

    this.adminOrganisationService.getOrgMembers(this.receivedSelectedOrg).subscribe(
      (data: User[]) => {
        console.log(data);
        data.map(o => {
          o ? this.orgMembers.push(o) : [];
        });
      }
    );

    //TODO: Filter the users list to not have have values of the orgMembers list (prevent showing users that are already in the organisation), DOES NOT WORK YET
    for( var i=this.users.length - 1; i>=0; i--){
      for( var j=0; j<this.orgMembers.length; j++){
        if(this.users[i] && (this.users[i].email === this.orgMembers[j].email)){
          this.users.splice(i, 1);
        }
      }
    }
    // this.users = this.users.filter((user:User ) => !this.orgMembers.includes(user));

  }
}


