import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {FbUserService} from "../../services/fb-user.service";

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
  public userId: string;
  queryParamSubscription: Subscription;

  constructor(private datasetService: FirebaseDatasetService,
              private activatedRoute: ActivatedRoute, private userService: FbUserService) {
    this.datasets = [];
    this.userId = userService.getLoggedInUser().email;

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
    this.datasetService.add(this.datasetService.generateRandomDataset());
    this.datasets = this.datasetService.getMyDatasets();
    console.log("Adding random dataset..");
  }

  //Check if upload button is clicked to open pop-up
  onUploadButtonClick() {
    this.uploadIsClicked = true;
  }

  ngOnInit() {
    /*this.queryParamSubscription = this.activatedRoute.queryParams.subscribe(
      (params: Params) =>{
        const id = params.id;
        console.log(id);
      }
    );*/
    this.datasets = this.datasetService.getMyDatasets();
    console.log(this.datasets);
  }

}
