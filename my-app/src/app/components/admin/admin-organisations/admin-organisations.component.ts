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

	constructor(private aOrganisationService: AOrganisationService) {
		this.organisations = aOrganisationService.getOrganisations();
	}

	ngOnInit() {
	}

}
