import { Component, OnInit } from '@angular/core';

//Models
import { Organisation } from '../../../models/organisation';
import { User } from 'src/app/models/user';

//Services
import { AOrganisationService } from '../../../services/a-organisation.service';

@Component({
	selector: 'app-admin-organisations',
	templateUrl: './admin-organisations.component.html',
	styleUrls: ['./admin-organisations.component.css']
})
export class AdminOrganisationsComponent implements OnInit {
	organisations: Organisation[] = [];

	constructor() {
		this.organisations.push(new Organisation("test1", new User("Sjaak", "Peter", "mail.test@test.edu", false)));
		this.organisations.push(new Organisation("test1", new User("Sjaak", "Peter", "mail.test@test.edu", false)));
		this.organisations.push(new Organisation("test1", new User("Sjaak", "Peter", "mail.test@test.edu", false)));
		this.organisations.push(new Organisation("test1", new User("Sjaak", "Peter", "mail.test@test.edu", false)));
		this.organisations.push(new Organisation("test1", new User("Sjaak", "Peter", "mail.test@test.edu", false)));
	}

	ngOnInit() {
	}

}
