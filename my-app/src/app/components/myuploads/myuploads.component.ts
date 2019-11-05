import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";

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

  constructor(private datasetService: FirebaseDatasetService) {
    this.datasets = [];
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

  //Function to delete a dataset
  onDelete(datasetIndex) {
    if (confirm("Are you sure to delete this dataset?")) {
      let selectedDataset: Dataset;
      selectedDataset = this.datasetService.getMyDatasets()[datasetIndex];
      this.datasetService.remove(selectedDataset);
      this.datasets = this.datasetService.getMyDatasets();
    }
  }

  //Testing purposes function, adds a random dataset
  onAdd(){

  }

  //Check if upload button is clicked to open pop-up
  onUploadButtonClick() {
    this.uploadIsClicked = true;
  }

  //Generates a random new dataset and adds it to the user's dataset
  onAddDataset() {

  }

  ngOnInit() {
    this.datasets = this.datasetService.getMyDatasets();
    console.log(this.datasets);
  }

}
