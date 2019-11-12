import { Component, OnInit } from '@angular/core';

//Models
import { Organisation } from '../../../models/organisation';
import { User } from 'src/app/models/user';

//Services
import { UserService } from '../../../services/user.service';
import { FbUser } from 'src/app/models/fb-user';
import { FbUserService } from 'src/app/services/fb-user.service';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
	users: FbUser[];
	editIsClicked: boolean = false;
	createIsClicked: boolean = false;
	activeIndex: number = null;
	selectedUser: FbUser = null;

	constructor(private aUserService: FbUserService) {
		this.users = aUserService.getUsers();
	}

	ngOnInit() {
	}

	onEditClick(originalUserIndex: number): void {
		this.editIsClicked = true;
		let copyUser = this.aUserService.getUsers()[originalUserIndex];
		this.activeIndex = originalUserIndex;
		this.selectedUser = copyUser;
	}
	
	onCreateButtonClick() {
		this.createIsClicked = true;
	}
	
	saveRequest($event): void {
		this.editIsClicked = false;
		this.users[this.activeIndex] = $event;
		this.aUserService.saveAllUsers();
	}

	onDeleteClick(user: FbUser){
		if(confirm("Delete user: "+ user.email)){
			this.aUserService.deleteUser(user);				
		}
	}
}
