import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {FirebaseFileService} from "../../services/firebase-file.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-myuploads',
  templateUrl: './myuploads.component.html',
  styleUrls: ['./myuploads.component.css']
})
export class MyuploadsComponent implements OnInit {

  private userDatasets: Dataset[];
  private uploadDatasetToggle: boolean;
  private editMetaDataToggle: boolean;
  private editDatasetToggle: boolean;
  private selectedDataset: Dataset;
  private activeIndex;
  public userId: number;
  private paramSubscription: Subscription;
  protected url: string;

  constructor(private datasetService: DatasetService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private router: Router,
              private fileService: FirebaseFileService) {
    this.userDatasets = [];
    this.editDatasetToggle = false;
    this.editMetaDataToggle = false;
    this.uploadDatasetToggle = false;
    this.userId = userService.getLoggedInUser().id;
  }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      const userEmail = params.email;
      this.datasetService.getAllDatasets().subscribe(
        (data: Dataset[]) => {
          // for each dataset check if dataset exists and if the email of the dataset uploader
          // is equal to the logged in user mail which gets extracted from the URL parameter
          // if true push the dataset to the datasets array else return an empty array
          if (data != null) {
            data.map((o) => {
              o && o.user.email == userEmail ? this.userDatasets.push(o) : [];
            });
          } else return null;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("Finished retrieving user's datasets");
        }
      );
      /*this.datasetService.getAllDatasets2().subscribe(
        (data: Dataset[]) => {
          // for each dataset check if dataset exists and if the email of the dataset uploader
          // is equal to the logged in user mail which gets extracted from the URL parameter
          // if true push the dataset to the datasets array else return an empty array
          if (data != null) {
            data.map((o) => {
              o && o.user.email == userEmail ? this.datasets.push(o) : [];
            });
          } else return null;
        }
      );
    }
  );*/

      this.fileService.getAllFileUrls();
    });

  }

  //This method gets the dataset from child component (edit-metadata-popup) to save the given edited dataset
  saveRequest($event) {
    this.editMetaDataToggle = false;
    console.log($event);
    console.log(this.activeIndex);
    //Update (save) the dataset in both arrays
    this.userDatasets[this.activeIndex] = $event;
    this.datasetService.updateDataset(this.userDatasets[this.activeIndex]);
  }

  //Check if edit button is clicked to open pop-up
  onEditMetaDataClick(datasetIndex: number) {
    this.activeIndex = datasetIndex;
    //Create a copy of the dataset so it won't immediately change in dataset overview while editing
    this.selectedDataset = Dataset.trueCopy(this.userDatasets[this.activeIndex]);
    console.log(this.selectedDataset);
    this.router.navigate(['editMetaData'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    });
    this.editMetaDataToggle = true;
  }

  //Check if upload button is clicked to open upload pop-up
  onUploadButtonClick() {
    this.uploadDatasetToggle = true;
    this.router.navigate(['uploadDataset'], {
      relativeTo: this.activatedRoute
    })
  }

  //Triggers when a dataset has been uploaded to refresh the overview
  onUploadDataset() {
    this.userDatasets = this.datasetService.getMyDatasets();
  }

  //Button to view the dataset visualization/chart
  onViewDatasetClick(datasetIndex: number) {
    this.selectedDataset = Dataset.trueCopy(this.userDatasets[datasetIndex]);
    this.editDatasetToggle = true;
    this.router.navigate(['viewDataset'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    })
  }

  //Function to delete a dataset
  onDelete(datasetIndex: number) {
    let selectedDataset: Dataset;
    selectedDataset = this.userDatasets[datasetIndex];
    console.log(selectedDataset);
    if (confirm("Are you sure to delete this dataset?")) {
      this.datasetService.deleteDataset(selectedDataset);
      this.fileService.deleteFile(selectedDataset);
      this.userDatasets = this.datasetService.getMyDatasets();
    }
  }

  //Downloads the dataset file by retrieving the specific download url from firebase storage
  onDownload(index: number) {
    let dataset = this.userDatasets[index];
    this.url = this.fileService.getDownloadUrl(dataset.fileName, dataset.id);
  }

  //Testing purposes function, adds a random dataset
  onAdd() {
    this.datasetService.addDataset(this.datasetService.generateRandomDataset());
    this.userDatasets = this.datasetService.getMyDatasets();
    console.log("Adding random dataset..");
  }


  onCloseReq() {
    console.log("Closing modal..");
    this.uploadDatasetToggle = false;
    this.editDatasetToggle = false;
    this.editMetaDataToggle = false;
    this.userDatasets = this.datasetService.getMyDatasets();
    console.log(this.userDatasets);
    /*this.datasetService.getAllDatasets().subscribe(
      (data: Dataset[]) => {
        data.map( o => o.user.id == this.userId ? this.userDatasets.push(o) : null);
      }
    );*/
  }

}
