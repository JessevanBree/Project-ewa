import { Component, OnInit } from '@angular/core';

//Models
import { Organisation } from '../../../models/organisation';
import { User } from 'src/app/models/user';

//Services
import {FbUserService} from 'src/app/services/fb-user.service';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
	editIsClicked: boolean;
	createIsClicked: boolean;
	activeIndex: number;
	selectedUser: User;
	searchFilter: String;
	emptyList: boolean;

	constructor(private aUserService: FbUserService) {
		this.activeIndex, this.selectedUser = null;
		this.editIsClicked, this.createIsClicked = false;
		this.searchFilter = "";
	}

	ngOnInit() {
		this.emptyList = this.aUserService.getUsers().length == 0;
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
		// console.log("event", $event)
		this.editIsClicked = false;
		// setTimeout(()=>{
		// 	console.log("created")
		// 	this.aUserService.getUsers().push(new User("JSNDKANSDK123", "test@test.tester", "test123", false));
		// }, 1000)
	}

	onDeleteClick(user: User){
		if(confirm("Delete user: "+ user.email)){
			this.aUserService.deleteUser(user);
		}
	}

	checkIfListEmpty(): void {
		if(this.aUserService.getUsers().length == 0) this.emptyList = true;
		setTimeout(() => {
			this.emptyList = document.getElementsByClassName("admin-user-item").length == 0;
		}, 5)
	}
}
