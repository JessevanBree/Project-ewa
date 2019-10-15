import { Component, OnInit } from '@angular/core';

//Model
import { Dataset } from '../../../models/dataset';

//Services
import {ADatasetService} from '../../../services/a-dataset.service';

@Component({
	selector: 'app-admin-datasets',
	templateUrl: './admin-datasets.component.html',
	styleUrls: ['./admin-datasets.component.css']
})
export class AdminDatasetsComponent implements OnInit {
	datasets: Dataset[];
	uploadIsClicked: boolean = false;
	editIsClicked: boolean = false;
	selectedDataset: Dataset;
	private activeIndex;

	constructor(private aDatasetService: ADatasetService) {
		this.datasets = [] = aDatasetService.getDatasets();
	}

	ngOnInit() {
	}

	//This method gets the event from child component (edit-pop-up) to save the edited dataset
	saveRequest($event) {
		this.editIsClicked = false;
		//Update (save) the dataset in both arrays
		this.datasets[this.activeIndex] = $event;
		this.aDatasetService.updateDataset(this.activeIndex, this.aDatasetService.getDatasets()[this.activeIndex]);
		console.log("Dataset has been saved");
	}

	//Check if edit button is clicked to open pop-up
	onEditButtonClick(dataset) {
		this.activeIndex = this.datasets.indexOf(dataset);

		//Create a copy of the dataset so it won't immediately change in dataset overview while editing
		this.selectedDataset = Dataset.trueCopy(this.datasets[this.activeIndex]);

		this.editIsClicked = true;
	}

}
