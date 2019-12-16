import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FbUserService} from "../../services/fb-user.service";
import {$e} from "codelyzer/angular/styles/chars";
import {FirebaseFileService} from "../../services/firebase-file.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-myuploads',
  templateUrl: './myuploads.component.html',
  styleUrls: ['./myuploads.component.css']
})
export class MyuploadsComponent implements OnInit {

  // datasets: object;
  datasets: Dataset[];
  uploadDatasetToggle: boolean;
  editMetaDataToggle: boolean;
  editDatasetToggle: boolean;
  selectedDataset: Dataset;
  private activeIndex;
  public userId: string;
  paramSubscription: Subscription;
  protected url: string;

  constructor(private datasetService: DatasetService, private activatedRoute: ActivatedRoute,
              private userService: UserService, private router: Router,
              private fileService: FirebaseFileService) {
    this.datasets = [];
    this.editDatasetToggle = false;
    this.editMetaDataToggle = false;
    this.uploadDatasetToggle = false;
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
              o && o.user.email == userEmail ? this.datasets.push(o) : [];
            });
          } else return null;
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


  //This method gets the event from child component (edit-pop-up) to save the edited dataset
  saveRequest($event) {
    this.editMetaDataToggle = false;
    console.log($event);
    console.log(this.activeIndex);
    //Update (save) the dataset in both arrays
    this.datasets[this.activeIndex] = $event;
    this.datasetService.updateDataset(this.activeIndex, this.datasets[this.activeIndex]);
  }

  //Check if edit button is clicked to open pop-up
  onEditMetaDataClick(datasetIndex: number) {
    this.activeIndex = datasetIndex;
    //Create a copy of the dataset so it won't immediately change in dataset overview while editing
    this.selectedDataset = Dataset.trueCopy(this.datasets[this.activeIndex]);
    this.router.navigate(['editMetaData'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    }).then(r => console.log(r));

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
    this.datasets = this.datasetService.getMyDatasets()
  }

  //Button to view the dataset visualization/chart
  onViewDatasetClick(datasetIndex: number) {
    this.selectedDataset = Dataset.trueCopy(this.datasets[datasetIndex]);
    this.editDatasetToggle = true;
    this.router.navigate(['viewDataset'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    })
  }

  //Function to delete a dataset
  onDelete(datasetIndex: number) {
    if (confirm("Are you sure to delete this dataset?")) {
      let selectedDataset: Dataset;
      selectedDataset = this.datasets[datasetIndex];
      this.datasetService.deleteDataset(selectedDataset);
      this.datasets = this.datasetService.getMyDatasets();
    }
  }

  //Downloads the dataset file by retrieving the specific download url from firebase storage
  onDownload(index: number) {
    let dataset = this.datasets[index];
    this.url = this.fileService.getDownloadUrlFromList(dataset);
  }

  //Testing purposes function, adds a random dataset
  onAdd() {
    this.datasetService.add(this.datasetService.generateRandomDataset());
    this.datasets = this.datasetService.getMyDatasets();
    console.log("Adding random dataset..");
  }


  onCloseReq() {
    console.log("Closing modal..");
    this.datasets = this.datasetService.getMyDatasets();
    this.uploadDatasetToggle = false;
    this.editDatasetToggle = false;
    this.editMetaDataToggle = false;
  }

}
