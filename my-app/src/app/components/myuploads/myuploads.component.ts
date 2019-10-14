import { Component, OnInit } from '@angular/core';
import {ADatasetService} from "../../services/a-dataset.service";
import {Dataset} from "../../models/dataset";

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

  constructor(private aDatasetService: ADatasetService) {
    this.datasets = aDatasetService.getDatasets();
  }

  //This method gets the event from child component (edit-pop-up) to save the edited dataset
  saveRequest($event){
    this.editIsClicked = false;
    //Update (save) the dataset in both arrays
    this.datasets[this.activeIndex] = $event;
    this.aDatasetService.updateDataset(this.activeIndex, this.aDatasetService.getDatasets()[this.activeIndex]);
    console.log("Dataset has been saved");
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

      //Get the dataset
      for (let i = 0; i < this.aDatasetService.getDatasets().length; i++) {
        if (datasetIndex == i) {
          selectedDataset = this.aDatasetService.getDatasets()[i];
        }
      }

      //Delete the dataset
      console.log(selectedDataset)
      this.aDatasetService.deleteDataset(selectedDataset);
    }
  }

  //Check if upload button is clicked to open pop-up
  onUploadButtonClick() {
    this.uploadIsClicked = true;
  }


  ngOnInit() {
  }

}
