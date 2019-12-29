import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";

@Component({
  selector: 'app-view-member-popup',
  templateUrl: './view-member-popup.component.html',
  styleUrls: ['./view-member-popup.component.css']
})
export class ViewMemberPopupComponent implements OnInit {

  @Output() userDeleted: EventEmitter<User>;

  @Input() private receivedSelectedUser: User;
  private hasNoFirstNameSet: boolean;
  private hasNoSurNameSet: boolean;

  constructor() {
    this.userDeleted = new EventEmitter<User>();
    this.hasNoFirstNameSet = false;
    this.hasNoSurNameSet = false;
  }

  onClose(){
    console.log("Modal has succesfully been closed");
  }

  onDelete(){
      this.userDeleted.emit(this.receivedSelectedUser);
  }

  ngOnInit() {
    // Check if names of the selected user are set
    if (typeof this.receivedSelectedUser.firstName == "undefined"){
      this.hasNoFirstNameSet = true;
    }

    if (typeof this.receivedSelectedUser.surName == "undefined"){
      this.hasNoSurNameSet = true;
    }

    console.log("DOES USER HAVE SURNAME: " + this.hasNoSurNameSet);

    console.log("DATE CREATED OF SELECTED ACCOUNT: " + this.receivedSelectedUser.dateCreated.getDate());
  }
}
