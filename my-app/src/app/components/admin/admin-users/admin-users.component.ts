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

	constructor(private aUserService: UserService) {
		this.users = aUserService.getUsers();
	}

	ngOnInit() {
	}


	delete(user: User){
		if(confirm("Delete user: "+ user.firstName + " " + user.surName)){
			this.aUserService.deleteUser(user);
		}
	}

	edit(){

	}
}
