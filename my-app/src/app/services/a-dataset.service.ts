import { Injectable } from '@angular/core';

import { Dataset } from '../models/dataset';
import { AUserService } from './a-user.service';
import { AOrganisationService } from './a-organisation.service';
import { User } from '../models/user';
import { SUR_NAMES } from '../models/testData';
import { Organisation } from '../models/organisation';

@Injectable({
  providedIn: 'root'
})
export class ADatasetService {
	private datasets: Dataset[];

	constructor( private aUserService: AUserService, private aOrganisationService: AOrganisationService) {
		this.datasets = [];
		
		for (let i = 0; i < 100; i++) {
			this.datasets[i] = this.genRandomDataset();
		}
	}

	public getDataset(index: number): Dataset{
		return this.datasets[index];
	}

	public deleteDataset(dataset: Dataset): Boolean {
		let datasetIndex: number = this.datasets.indexOf(dataset);
		if( datasetIndex != -1 ){
			this.datasets.splice(datasetIndex, 1)
			return this.datasets[datasetIndex].equals(dataset);
		} else {
			return;
		}
	}

	public addDataset(dataset: Dataset): Boolean{
		this.datasets.push(dataset);
		return this.datasets[this.datasets.length-1].equals(dataset);
	}

	public updateDataset(index:number, dataset: Dataset): Boolean {
		if( !this.datasets[index] || !dataset ) return false;
		
		this.datasets[index] = dataset;
		return this.datasets[index].equals(dataset);
	}

	getDatasets(): Dataset[]{
		return this.datasets;
	}

	genRandomDataset(): Dataset{
		let user: User = this.aUserService.genRandomUser();
		let org: Organisation = this.aOrganisationService.genRandomOrganisation();
		let datasetName: String = SUR_NAMES[Math.floor(Math.random() * SUR_NAMES.length)].toLowerCase() + "Set";

		return new Dataset(datasetName, user, org);
	}
}
