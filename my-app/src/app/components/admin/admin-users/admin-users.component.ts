import { Component, OnInit } from '@angular/core';

//Models
import { Organisation } from '../../../models/organisation';
import { User } from 'src/app/models/user';

//Services
import { AUserService } from '../../../services/a-user.service';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
	users: User[] = [];

	constructor() {
		this.users.push(new User("Sjaak", "Peter", "mail.test@test.edu", false));
		this.users.push(new User("Sjaak", "Peter", "mail.test@test.edu", false));
		this.users.push(new User("Sjaak", "Peter", "mail.test@test.edu", false));
		this.users.push(new User("Sjaak", "Peter", "mail.test@test.edu", false));
		this.users.push(new User("Sjaak", "Peter", "mail.test@test.edu", false));
	}

	ngOnInit() {
	}

}
