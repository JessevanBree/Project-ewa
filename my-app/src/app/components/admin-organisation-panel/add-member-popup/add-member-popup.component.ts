import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-member-popup',
  templateUrl: './add-member-popup.component.html',
  styleUrls: ['./add-member-popup.component.css']
})
export class AddMemberPopupComponent implements OnInit {

  @Output() closingToggle: EventEmitter<boolean>;

  constructor() {
    this.closingToggle = new EventEmitter<boolean>();
  }

  // This method is called when the user submits the form
  onSubmit(form: NgForm){
    let addedUserEmail = form.value.searchInput;

    if (confirm("Are you sure to add the following member: " + addedUserEmail)){
      // Logic to actually add the new member to the org

      console.log("Member added!");
    } else {
      alert("Adding new member has been canceled");
    }

    // Close the modal when the form has been submitted
    this.closingToggle.emit(true);
  }

  ngOnInit() {
  }

}
