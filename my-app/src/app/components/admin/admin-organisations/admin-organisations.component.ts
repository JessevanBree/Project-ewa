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
	editIsClicked: boolean = false;
	createIsClicked: boolean = false;
	activeIndex: number = null;
	selectedOrganisation: Organisation = null;

	constructor(private aOrganisationService: AOrganisationService) {
		this.organisations = aOrganisationService.getOrganisations();
	}

	ngOnInit(): void {
	}

	onEditClick(originalOrganisationIndex: number): void {
		this.editIsClicked = true;
		let copyOrganisation = Organisation.trueCopy(this.aOrganisationService.getOrganisation(originalOrganisationIndex));
		this.activeIndex = originalOrganisationIndex;
		this.selectedOrganisation = copyOrganisation;
	}
	
	onCreateButtonClick() {
		this.createIsClicked = true;
	}
	
	saveRequest($event): void {
		this.editIsClicked = false;
		this.organisations[this.activeIndex] = $event;
		this.aOrganisationService.updateOrganisation(this.activeIndex, this.organisations[this.activeIndex]);
	}

	onDeleteClick(org: Organisation){
		if(confirm("Delete organisation: "+ org.name)){
			this.aOrganisationService.deleteOrganisation(org);
		} 
	}

}
