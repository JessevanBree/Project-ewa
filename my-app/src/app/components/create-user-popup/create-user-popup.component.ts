import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dataset, Publicity } from "../../models/dataset";
import { ADatasetService } from "../../services/a-dataset.service";
import { Organisation } from "../../models/organisation";
import { User } from "../../models/user";
import { AOrganisationService } from "../../services/a-organisation.service";
import { FbUserService } from "../../services/fb-user.service";
import { NgForm } from "@angular/forms";

@Component({
	selector: 'app-create-user-popup',
	templateUrl: './create-user-popup.component.html',
	styleUrls: ['./create-user-popup.component.css']
})
export class CreateUserPopupComponent implements OnInit {
	isClicked: boolean = false;

	@Input() user: User;
	@Output() savedUser = new EventEmitter<User>();

	constructor(private aUserService: FbUserService, private aOrganisationService: AOrganisationService) {}

	ngOnInit() {
		this.isClicked = true;   // if modal is instantiated, isClicked is set to true
	}

	//This method saves the edited changes of a dataset
	onSubmit(form: NgForm) {
		this.aUserService.saveOrCreateUser(new User(null, form.value.emailInput, form.value.passwordInput, form.value.isAdmin, 
			form.value.firstName, form.value.surName, this.aOrganisationService.getOrganisationById(parseInt(form.value.orgInput))));
	}

	private setClickedToFalse() {
		this.isClicked = false;
	}

}
