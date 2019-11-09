import { Component, OnInit } from '@angular/core';
import { AOrganisationService } from "src/app/services/a-organisation.service";
import { SessionService } from 'src/app/services/session/session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-panel',
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
	constructor(private aOrganisationService: AOrganisationService, private sessionService: SessionService, private router: Router) {

	}

	ngOnInit() {
		if(!this.sessionService.isAdmin){
			this.router.navigate(["/"])
		}
	}

}
