import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../models/user";
import {FbUserService} from "../../services/fb-user.service";
import { AOrganisationService } from 'src/app/services/a-organisation.service';

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
		this._editingUser = User.trueCopy(user);
	}

	get editingUser(): User {
		return this._editingUser;
	}

	constructor(private aUserService: FbUserService, private aOrgService: AOrganisationService) {}

	ngOnInit(): void {
	}

	onSaveChanges() {
		if(this._editingUser.password == undefined) this._editingUser.password = 'testen'; 
		this.aUserService.saveOrCreateUser(this._editingUser);
		this.savedUser.emit(this._editingUser);
	}
}
