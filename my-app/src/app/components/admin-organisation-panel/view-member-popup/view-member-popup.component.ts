import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Organisation} from "../../../models/organisation";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-member-popup',
  templateUrl: './view-member-popup.component.html',
  styleUrls: ['./view-member-popup.component.css']
})
export class ViewMemberPopupComponent implements OnInit, OnDestroy {

  @Output() userDeleted: EventEmitter<User>;

  @Output() modalClosed: EventEmitter<boolean>;

  private selectedUser: User;

  private hasFirstNameSet: boolean;
  private hasSurNameSet: boolean;

  private queryParamSubscription: Subscription;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.userDeleted = new EventEmitter<User>();
    this.modalClosed = new EventEmitter<boolean>();
    this.hasFirstNameSet = false;
    this.hasSurNameSet = false;
  }

  onClose(){
    console.log("Modal has succesfully been closed");
    this.modalClosed.emit(true);
  }

  onDelete(){
      this.userDeleted.emit(this.selectedUser);
  }

  ngOnInit() {
    // Get selected user from the url parameter ID
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.selectedUser = this.userService.getUserById(id);
            console.log(this.selectedUser.email);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
  }
}
