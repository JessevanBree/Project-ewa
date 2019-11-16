import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AUserService} from "../../services/fb-user.service";

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

  constructor(private datasetService: FirebaseDatasetService, private activatedRoute: ActivatedRoute,
              private aUserService: AUserService, private router: Router) {
    this.datasets = [];

    this.editDatasetToggle = false;
    this.editMetaDataToggle = false;
    this.uploadDatasetToggle = false;
  }

  //This method gets the event from child component (edit-pop-up) to save the edited dataset
  saveRequest($event) {
    this.editMetaDataToggle = false;
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
    });

    this.editMetaDataToggle = true;
  }

  //Check if upload button is clicked to open pop-up
  onUploadButtonClick() {
    this.uploadDatasetToggle = true;
    this.router.navigate(['uploadDataset'], {
      relativeTo: this.activatedRoute
    })
  }

  onEditDatasetClick(datasetIndex: number) {
    this.selectedDataset = Dataset.trueCopy(this.datasets[datasetIndex]);
    this.editDatasetToggle = true;
    this.router.navigate(['editDataset'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    })
  }

  //Function to delete a dataset
  onDelete(datasetIndex: number) {
    if (confirm("Are you sure to delete this dataset?")) {
      let selectedDataset: Dataset;
      selectedDataset = this.datasets[datasetIndex];
      this.datasetService.remove(selectedDataset);
      this.datasets = this.datasetService.getMyDatasets();
    }
  }

  //Testing purposes function, adds a random dataset
  onAdd() {
    this.datasetService.add(this.datasetService.generateRandomDataset());
    this.datasets = this.datasetService.getMyDatasets();
    console.log("Adding random dataset..");
  }


  onCloseReq() {
    console.log("Closing modal..");
    this.uploadDatasetToggle = false;
    this.editDatasetToggle = false;
    this.editMetaDataToggle = false;
  }


  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe((params: Params) => {
        const userEmail = params.email;
        this.datasetService.getAllDatasets2().subscribe(
          (data: Dataset[]) => {
            data.map((o) => {
              o && o.user.email == userEmail ? this.datasets.push(o) : [];
            })
          }
        );
      }
    );
  }

}
