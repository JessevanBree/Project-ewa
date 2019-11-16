import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FbUser} from "../../models/fb-user";
import {FbUserService} from "../../services/fb-user.service";

@Component({
  selector: 'app-edit-user-popup',
  templateUrl: './edit-user-popup.component.html',
  styleUrls: ['./edit-user-popup.component.css']
})
export class EditUserPopupComponent implements OnInit {

  @Input() editingUser: FbUser;
  @Output() savedUser: EventEmitter<FbUser> = new EventEmitter<FbUser>();

  constructor(private aFbUserService: FbUserService) {
  }

  ngOnInit(): void {
  }

  onSaveChanges() {
    this.savedUser.emit(this.editingUser);
  }
}
