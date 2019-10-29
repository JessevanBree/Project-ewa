import { Component, OnInit } from '@angular/core';
import { Dataset } from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";

@Component({
	selector: 'app-myuploads',
	templateUrl: './myuploads.component.html',
	styleUrls: ['./myuploads.component.css']
})
export class MyuploadsComponent implements OnInit {

	// datasets: object;
	datasets: Dataset[] = [];
	uploadIsClicked: boolean = false;
	editIsClicked: boolean = false;
	selectedDataset: Dataset;
	private activeIndex;

	constructor(private datasetService: DatasetService) {
		this.datasets = datasetService.getDatasets();
	}

	//This method gets the event from child component (edit-pop-up) to save the edited dataset
	saveRequest($event) {
		this.editIsClicked = false;
		//Update (save) the dataset in both arrays
		this.datasets[this.activeIndex] = $event;
		this.datasetService.updateDataset(this.activeIndex, this.datasetService.getDatasets()[this.activeIndex]);
	}

	//Check if edit button is clicked to open pop-up
	onEditButtonClick(datasetIndex) {
		this.activeIndex = datasetIndex;

		//Create a copy of the dataset so it won't immediately change in dataset overview while editing
		this.selectedDataset = Dataset.trueCopy(this.datasets[this.activeIndex]);

		this.editIsClicked = true;
	}

	//Onclick function to delete a dataset
	onDeletebuttonClick(datasetIndex) {
		if (confirm("Are you sure to delete this dataset?")) {
			let selectedDataset: Dataset;

      selectedDataset = this.datasetService.getDatasets()[datasetIndex];

			this.datasetService.deleteDataset(selectedDataset);
		}
	}

	//Check if upload button is clicked to open pop-up
	onUploadButtonClick() {
		this.uploadIsClicked = true;
	}

	ngOnInit() {
	}

}
