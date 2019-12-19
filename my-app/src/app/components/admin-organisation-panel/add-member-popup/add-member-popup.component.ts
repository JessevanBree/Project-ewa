import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {HttpClient} from "@angular/common/http";
import {AdminOrganisationService} from "../../../services/admin-organisation.service";

@Component({
  selector: 'app-add-member-popup',
  templateUrl: './add-member-popup.component.html',
  styleUrls: ['./add-member-popup.component.css']
})
export class AddMemberPopupComponent implements OnInit {

  @Output() closingToggle: EventEmitter<boolean>;

  @Input() private receivedSelectedOrg: Organisation;

  private users: User[];

  private emptyList: boolean;
  searchedUser: String;

  constructor(private userService: UserService, private adminOrganisationService: AdminOrganisationService) {
    this.closingToggle = new EventEmitter<boolean>();
    this.searchedUser = "";

    this.users = [];

  }

  // This method is called when the user submits the form (temporary not being used since the org admin clicks on a user)
  onSubmit(form: NgForm) {
    // let addedUserEmail = form.value.searchInput;
    //
    // if (confirm("Are you sure to add the following member: " + addedUserEmail)) {
    //   // Logic to actually add the new member to the org
    //
    //   console.log("Member added!");
    // } else {
    //   alert("Adding new member has been canceled");
    // }
    //
    // // Close the modal when the form has been submitted
    // this.closingToggle.emit(true);
  }

  // Called when the org admin clicks on a user to add the user to the org
  userSelected(user: User){
    console.log("This member is about to be added: " + user.email);

    if (confirm("Are you sure to add the following user: " + user.email)) {
      this.adminOrganisationService.addUserToOrganisation(user, this.receivedSelectedOrg).subscribe(
        (user: User) => {
           console.log(user);
        },
        (error: any) => console.log(error)
      );
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
    this.emptyList = this.users.length == 0;
  }
}


