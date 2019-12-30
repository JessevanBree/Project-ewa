import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-view-member-popup',
  templateUrl: './view-member-popup.component.html',
  styleUrls: ['./view-member-popup.component.css']
})
export class ViewMemberPopupComponent implements OnInit {

  @Output() userDeleted: EventEmitter<User>;

  private user: User;

  @Input() private receivedSelectedUser: User;
  private hasFirstNameSet: boolean;
  private hasSurNameSet: boolean;

  constructor(private userService: UserService) {
    this.userDeleted = new EventEmitter<User>();
    this.hasFirstNameSet = false;
    this.hasSurNameSet = false;
  }

  onClose(){
    console.log("Modal has succesfully been closed");
  }

  onDelete(){
      this.userDeleted.emit(this.receivedSelectedUser);
  }

  ngOnInit() {
    this.user = this.userService.getUserByEmail(this.receivedSelectedUser.email);

    // Check if names of the selected user are set
    if (typeof this.receivedSelectedUser.firstName !== "undefined"){
      this.hasFirstNameSet = true;
    }

    if (typeof this.receivedSelectedUser.surName !== "undefined"){
      this.hasSurNameSet = true;
    }

    console.log("IS FIRST NAME SET: " + this.hasFirstNameSet + " FIRST NAME: " + this.receivedSelectedUser.firstName + " IS SURNAME: " + this.hasSurNameSet + " SURNAME: " + this.receivedSelectedUser.surName);

    // console.log("DATE CREATED OF SELECTED ACCOUNT: " + this.receivedSelectedUser.dateCreated.getDate());
  }
}
