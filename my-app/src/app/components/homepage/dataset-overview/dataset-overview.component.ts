import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../../models/dataset";
import {ActivatedRoute, Router} from "@angular/router";
import {FirebaseDatasetService} from "../../../services/firebase-dataset.service";
import {FbUserService} from "../../../services/fb-user.service";
import {FbSessionService} from "../../../services/session/fb-session.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dataset-overview',
  templateUrl: './dataset-overview.component.html',
  styleUrls: ['./dataset-overview.component.css']
})
export class DatasetOverviewComponent implements OnInit {
  private datasets: Dataset[];
  private copyDatasets: Dataset[];

  // if subscribing wants to be done in the view component
  private datasets$: Observable<Dataset[]>;

  private EUdatasets: Dataset[];
  private NATdatasets: Dataset[];
  private URBdatasets: Dataset[];

  private dataAvailable: boolean;

  private selectedDataset: Dataset;
  private activeIndex: number;
  private searchQuery: any;

  constructor(private datasetService: FirebaseDatasetService, private router: Router,
              private activatedRoute: ActivatedRoute, private userService: FbUserService,
              private sessionService: FbSessionService) {
    this.datasets = [];
    this.NATdatasets = [];
    this.EUdatasets = [];
    this.URBdatasets = [];

    this.dataAvailable = false;
    /*console.log(this.datasets);
    console.log(this.NATdatasets);
    console.log(this.URBdatasets);
    console.log(this.EUdatasets);*/
    this.activeIndex = null;
    this.searchQuery = '';

  }

  onSelection(index: number, dataset: Dataset) {
    switch (dataset.region) {
      case "European":
        this.activeIndex = index;
        this.selectedDataset = this.EUdatasets[this.activeIndex];
        this.router.navigate(['detail'], {
          relativeTo: this.activatedRoute,
          queryParams: {id: this.selectedDataset.id}
        });
        break;
      case "National":
        this.activeIndex = index;
        this.selectedDataset = this.NATdatasets[this.activeIndex];
        this.router.navigate(['detail'], {
          relativeTo: this.activatedRoute,
          queryParams: {id: this.selectedDataset.id}
        });
        break;
      case "Urban":
        this.activeIndex = index;
        this.selectedDataset = this.URBdatasets[this.activeIndex];
        this.router.navigate(['detail'], {
          relativeTo: this.activatedRoute,
          queryParams: {id: this.selectedDataset.id}
        });
        break;
    }
  }

  onFilterRegion(option: string) {
    switch (option) {
      case ("EU"):
        this.activeIndex = null;
        this.EUdatasets = this.datasetService.getEUDatasets();
        this.NATdatasets = [];
        this.URBdatasets = [];
        break;
      case ("NAT"):
        this.activeIndex = null;
        this.NATdatasets = this.datasetService.getNATDatasets();
        this.EUdatasets = [];
        this.URBdatasets = [];
        break;
      case ("URB"):
        this.activeIndex = null;
        this.URBdatasets = this.datasetService.getURBDatasets();
        this.EUdatasets = [];
        this.NATdatasets = [];
        break;
      case ("ALL"):
        this.activeIndex = null;
        this.URBdatasets = this.datasetService.getURBDatasets();
        this.NATdatasets = this.datasetService.getNATDatasets();
        this.EUdatasets = this.datasetService.getEUDatasets();
    }
  }

  /**
   * Filter the datasets per publicity
   * @param publicityOption the wanted publicity
   */
  onFilterPublicity(publicityOption: string) {
    switch (publicityOption) {
      case ("Public"):
        this.activeIndex = null;
        this.copyDatasets = this.datasetService.getPublicDatasets();
        break;
      case ("Group"):
        this.activeIndex = null;
        // this.copyDatasets = this.datasetService.getGroupDatasets();
        //TODO:: MAKE USE OF THE GETGROUPDATASETS() METHOD IN THE DATASETSERVICE
        this.copyDatasets = this.datasetService.getDatasets().filter(dataset => {
          return dataset.publicity.toLowerCase().trim().includes("Group".toLowerCase().trim());
        });
        console.log("Copy GROUP:" + this.copyDatasets);
        break;
      case ("Private"):
        this.activeIndex = null;
        this.copyDatasets = this.datasetService.getMyDatasets();
        break;
      case ("All"):
        this.activeIndex = null;
        this.copyDatasets = this.datasets;
        break;
      default :
        this.activeIndex = null;
        this.copyDatasets = this.datasets;
    }
  }

  /**
   * Filter the datasets per publicity
   * @param publicityOption the wanted publicity
   */
  // !! alleen gebruiken als je geen copyDatasets gaat gebruiken -NOG NIET AF
  // onFilterPublicity(publicityOption: string) {
  //   switch (publicityOption) {
  //     case ("PUBLIC"):
  //       this.activeIndex = null;
  //       this.EUdatasets = this.datasetService.getPublicDatasets();
  //       break;
  //     case ("GROUP"):
  //       this.activeIndex = null;
  //       this.EUdatasets = this.datasetService.getGroupDatasets();
  //       break;
  //     case ("PRIVATE"):
  //       this.activeIndex = null;
  //       this.EUdatasets = this.datasetService.getMyDatasets();
  //       break;
  //     case ("ALL"):
  //       this.activeIndex = null;
  //       this.EUdatasets = this.datasetService.getEUDatasets();
  //       break;
  //     default :
  //       this.activeIndex = null;
  //       this.EUdatasets = this.datasetService.getEUDatasets();
  //   }
  // }

  onSearch() {
    console.log("Search button clicked!");
    this.datasets.filter(eachItem => {
      return eachItem['name'].toLowerCase().includes(this.searchQuery.toLowerCase())
    });
  }

  ngOnInit() {
    // this.datasets = null;
    // this.datasets = this.datasetService.getDatasets();

    // subscribing in the view component
    this.datasets$ = this.datasetService.getAllDatasets2();


    // subscribe to get all the datasets
    this.datasetService.getAllDatasets2().subscribe(
      (data: Dataset[]) => {
        if (data != null) {
          // push each dataset to the dataset array
          data.map((o) => {
            o ? this.datasets.push(o) : [];
          });
        }
      },
      // log the existing error to the console
      (error) => (console.log("Error: " + error)),
      // when 'complete' make a new array which is a
      // copy of the datasets array with other memory location
      () => {
        this.copyDatasets = Object.assign([], this.datasets);
      }
    );

    setTimeout(() => {
      this.EUdatasets = this.datasetService.getEUDatasets();
      this.NATdatasets = this.datasetService.getNATDatasets();
      this.URBdatasets = this.datasetService.getURBDatasets();
      console.log(this.NATdatasets);
    }, 500)
  }
}
