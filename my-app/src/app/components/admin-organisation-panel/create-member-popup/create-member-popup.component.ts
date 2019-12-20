import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";

@Component({
  selector: 'app-create-member-popup',
  templateUrl: './create-member-popup.component.html',
  styleUrls: ['./create-member-popup.component.css']
})
export class CreateMemberPopupComponent implements OnInit {

  @Output() closingToggle: EventEmitter<boolean>;

  @Input() private receivedSelectedOrg: Organisation;

  constructor() {
    this.closingToggle = new EventEmitter<boolean>();
  }

  onSubmit(form: NgForm){
    let firstName = form.value.firstName;
    let surName = form.value.surName;
    let email = form.value.email;
    let password = form.value.password;

    console.log(firstName + " " + surName + " " + email + " " + password);

    if (confirm("Are you sure to create and add the following member: " + email)){

      //1. First create the member
      let newMember = new User(email, password, false, firstName, surName, this.receivedSelectedOrg);

      //2. Post the member to backend


      //2. Add member to the organisation

    } else {
      alert("Adding new member has been canceled");
    }

    // Close the modal when the form has been submitted
    this.closingToggle.emit(true);
  }

  ngOnInit() {
  }

}
