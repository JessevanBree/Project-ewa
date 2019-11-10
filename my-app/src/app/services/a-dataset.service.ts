import { Injectable } from '@angular/core';
import {Dataset, Publicity} from '../models/dataset';
import { UserService } from './user.service';
import { AOrganisationService } from './a-organisation.service';
import { User } from '../models/user';
import { SUR_NAMES } from '../models/testData';
import { Organisation } from '../models/organisation';
import { LoremIpsum } from 'lorem-ipsum';

@Injectable({
  providedIn: 'root'
})
export class ADatasetService {
	private datasets: Dataset[];

	constructor(private aUserService: UserService, private aOrganisationService: AOrganisationService) {
		this.datasets = [];

		for (let i = 0; i < 10; i++) {
			//this.datasets[i] = this.genRandomDataset();
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
    return null;
	}

	public updateDataset(index:number, dataset: Dataset): Boolean {
		if( !this.datasets[index] || !dataset ) return false;

		this.datasets[index] = dataset;
		return this.datasets[index].equals(dataset);
    return null;
	}

	getDatasets(): Dataset[]{
		return this.datasets;
	}

	getRandomText(): string{
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 1,
        min: 0
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });

    return lorem.generateWords()
  }

	/*genRandomDataset(): Dataset{
		let user: User = this.aUserService.genRandomUser();
		let org: Organisation = this.aOrganisationService.genRandomOrganisation();
		let datasetName: string = SUR_NAMES[Math.floor(Math.random() * SUR_NAMES.length)].toLowerCase() + "Set";
		let datasetDescription: string = this.getRandomText();
    let publicityKeys = Object.keys(Publicity);
    let datasetPublicity = publicityKeys[Math.floor(Math.random() * 3)];
    return null;
		//return new Dataset(datasetName, datasetDescription, datasetPublicity, user, org);
	}*/



}
