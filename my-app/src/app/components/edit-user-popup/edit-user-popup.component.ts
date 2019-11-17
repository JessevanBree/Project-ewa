import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../models/user";
import {FbUserService} from "../../services/fb-user.service";

@Component({
	selector: 'app-edit-user-popup',
	templateUrl: './edit-user-popup.component.html',
	styleUrls: ['./edit-user-popup.component.css']
})
export class EditUserPopupComponent implements OnInit {
	_editingUser: User;
	@Output() savedUser: EventEmitter<User> = new EventEmitter<User>();

	@Input()
	set editingUser(user: User) {
		console.log(user)
		this._editingUser = User.trueCopy(user);
		console.log(this._editingUser)
	}

	get editingUser(): User {
		return this._editingUser;
	}

	constructor(private aUserService: FbUserService) {
	}

	ngOnInit(): void {
	}

	onSaveChanges() {
		this.savedUser.emit(this._editingUser);
	}
}
