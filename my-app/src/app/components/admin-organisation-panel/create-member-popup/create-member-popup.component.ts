import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {AdminOrganisationService} from "../../../services/admin-organisation.service";

@Component({
  selector: 'app-create-member-popup',
  templateUrl: './create-member-popup.component.html',
  styleUrls: ['./create-member-popup.component.css']
})
export class CreateMemberPopupComponent implements OnInit {

  @Output() closingToggle: EventEmitter<boolean>;

  @Input() private receivedSelectedOrg: Organisation;

  constructor(private userService: UserService, private adminOrganisationService: AdminOrganisationService) {
    this.closingToggle = new EventEmitter<boolean>();
  }

  onSubmit(form: NgForm){
    let firstName = form.value.firstName;
    let surName = form.value.surName;
    let email = form.value.email;
    let password = form.value.password;

    console.log(firstName + " " + surName + " " + email + " " + password);

    if (confirm("Are you sure to create and add the following member: " + email)){

      // Create user
      let newMember = new User(email, false, firstName, surName, password, this.receivedSelectedOrg);
      this.userService.createUser(newMember).subscribe(
        (user: User) => {
          newMember = user; // Assign returned user to also get the ID
          console.log(user);
        },
        (error: any) => console.log(error)
      );

      setTimeout(() => {
        // Add user to the organisation
        this.adminOrganisationService.addUserToOrganisation(newMember, this.receivedSelectedOrg).subscribe(
          (user: User) => {
            console.log(user);
          },
          (error: any) => console.log(error)
        );
      }, 200);

    } else {
      alert("Adding new member has been canceled");
    }

    // Close the modal when the form has been submitted
    this.closingToggle.emit(true);
  }

  ngOnInit() {
  }

}
