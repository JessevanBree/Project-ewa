import { Injectable } from '@angular/core';

import {AUserService} from 'src/app/services/fb-user.service';

//Models
import { User } from 'src/app/models/user';
import { Organisation } from 'src/app/models/organisation';
import { SUR_NAMES } from 'src/app/models/testData';

@Injectable({
	providedIn: 'root'
})
export class AOrganisationService {
	private organisations: Organisation[];

	constructor(private aUserService: AUserService) {
		this.organisations = [];
		for (let i = 0; i < 100; i++) {
			this.organisations[i] = this.genRandomOrganisation();
		}
	}

	public getOrganisation(index: number): Organisation {
		return this.organisations[index];
	}

	public deleteOrganisation(org: Organisation): Boolean {
		let orgIndex: number = this.organisations.indexOf(org);
		if (orgIndex != -1) {
			this.organisations.splice(orgIndex, 1)
			return this.organisations[orgIndex].equals(org);
		} else {
			return;
		}
	}

	public addOrganisation(org: Organisation): Boolean {
		this.organisations.push(org);
		return this.organisations[this.organisations.length - 1].equals(org);
	}

	public updateOrganisation(index: number, org: Organisation): Boolean {
		if (!this.organisations[index] || !org) return false;

		this.organisations[index] = org;
		return this.organisations[index].equals(org);
	}

	getOrganisations(): Organisation[] {
		return this.organisations;
	}

	genRandomOrganisation(): Organisation {
		let user: User = this.aUserService.getUsers()[Math.floor(Math.random() * this.aUserService.getUsers().length)]
		return new Organisation(SUR_NAMES[Math.floor(Math.random() * SUR_NAMES.length)].toLowerCase() + " & Co", user);
	}
}
