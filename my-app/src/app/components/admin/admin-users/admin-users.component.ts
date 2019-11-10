import { Component, OnInit } from '@angular/core';

//Models
import { Organisation } from '../../../models/organisation';
import { User } from 'src/app/models/user';

//Services
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
	users: User[];
	editIsClicked: boolean = false;
	createIsClicked: boolean = false;
	activeIndex: number = null;
	selectedUser: User = null;

	constructor(private aUserService: UserService) {
		this.users = aUserService.getUsers();
	}

	ngOnInit() {
	}

	onEditClick(originalUserIndex: number): void {
		this.editIsClicked = true;
		let copyUser = User.trueCopy(this.aUserService.getUser(originalUserIndex));
		this.activeIndex = originalUserIndex;
		this.selectedUser = copyUser;
	}
	
	onCreateButtonClick() {
		this.createIsClicked = true;
	}
	
	saveRequest($event): void {
		this.editIsClicked = false;
		this.users[this.activeIndex] = $event;
		this.aUserService.updateUser(this.activeIndex, this.users[this.activeIndex]);
	}

	onDeleteClick(user: User){
		if(confirm("Delete user: "+ user.firstName + " " + user.surName)){
			this.aUserService.deleteUser(user);
		}
	}
}
