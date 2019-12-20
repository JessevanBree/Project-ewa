import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

//Model
import {Dataset} from '../../../models/dataset';
import {UsersEnum} from 'src/app/models/enums/admin-sort-enums'

//Services
import {FirebaseDatasetService} from 'src/app/services/firebase-dataset.service';
import {DatasetService} from "../../../services/dataset.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-datasets',
  templateUrl: './admin-datasets.component.html',
  styleUrls: ['./admin-datasets.component.css']
})
export class AdminDatasetsComponent implements OnInit {
  datasets: Dataset[];
  uploadIsClicked: boolean;
  editIsClicked: boolean;
  selectedDataset: Dataset;
  searchFilter: String;
  emptyList: boolean;
  private activeIndex;

  constructor(private datasetService: DatasetService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.uploadIsClicked, this.editIsClicked = false;
    this.searchFilter = "";
  }

  ngOnInit() {
    this.datasets = [] = this.datasetService.getDatasets();
    this.emptyList = this.datasets.length == 0;
  }

  //This method gets the event from child component (edit-pop-up) to save the edited dataset
  saveRequest($event) {
    this.editIsClicked = false;
    //Update (save) the dataset in both arrays
    this.datasets[this.activeIndex] = $event;
    //this.datasetService.updateDataset(this.activeIndex, this.datasetService.getDatasets()[this.activeIndex]);
    console.log("Dataset has been saved");
  }

  //Check if edit button is clicked to open pop-up
  onEditButtonClick(dataset) {
    this.activeIndex = this.datasets.indexOf(dataset);

    //Create a copy of the dataset so it won't immediately change in dataset overview while editing
    this.selectedDataset = Dataset.trueCopy(this.datasets[this.activeIndex]);

    this.editIsClicked = true;
  }

  onDeleteClick(dataset: Dataset) {
    if (confirm("Delete dataset: " + dataset.name)) {
      this.datasetService.deleteDataset(dataset);
    }
  }

  checkIfListEmpty(): void {
    if (this.datasets.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("admin-dataset-item").length == 0;
    }, 5)
  }

  editPopUpIsClosed() {
    this.router.navigate(['admin']);
  }
}
