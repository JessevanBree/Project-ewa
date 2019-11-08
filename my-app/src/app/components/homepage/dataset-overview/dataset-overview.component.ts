import {Component, OnInit} from '@angular/core';
import {Dataset} from "../../../models/dataset";
import {ActivatedRoute, Router} from "@angular/router";
import {FirebaseDatasetService} from "../../../services/firebase-dataset.service";
import {FbUserService} from "../../../services/fb-user.service";


@Component({
  selector: 'app-dataset-overview',
  templateUrl: './dataset-overview.component.html',
  styleUrls: ['./dataset-overview.component.css']
})
export class DatasetOverviewComponent implements OnInit {
  private datasets: Dataset[];
  private EUdatasets: Dataset[];
  private NATdatasets: Dataset[];
  private URBdatasets: Dataset[];

  private dataAvailable: boolean;

  private selectedDataset: Dataset;
  private activeIndex: number;
  private searchQuery: any;

  constructor(private datasetService: FirebaseDatasetService, private router: Router,
              private activatedRoute: ActivatedRoute, private userService: FbUserService) {
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

  onFilter(option: string) {
    switch (option) {
      case ("EU"):
        // console.log("EU filter");
        this.activeIndex = null;
        this.EUdatasets = this.datasetService.getEUDatasets();
        this.NATdatasets = [];
        this.URBdatasets = [];
        break;
      case ("NAT"):
        // console.log("NAT filter");
        this.activeIndex = null;
        this.NATdatasets = this.datasetService.getNATDatasets();
        this.EUdatasets = [];
        this.URBdatasets = [];
        break;
      case ("URB"):
        // console.log("URB filter");
        this.activeIndex = null;
        this.URBdatasets = this.datasetService.getURBDatasets();
        this.EUdatasets = [];
        this.NATdatasets = [];
        break;
      case ("ALL"):
        // console.log("Displays all datasets");
        this.activeIndex = null;
        this.URBdatasets = this.datasetService.getURBDatasets();
        this.NATdatasets = this.datasetService.getNATDatasets();
        this.EUdatasets = this.datasetService.getEUDatasets();
    }
  }

  onSearch() {
    console.log("Search button clicked!");
    this.datasets.filter(eachItem => {
      return eachItem['name'].toLowerCase().includes(this.searchQuery.toLowerCase())
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.datasets = this.datasetService.getDatasets();
      this.EUdatasets = this.datasetService.getEUDatasets();
      this.NATdatasets = this.datasetService.getNATDatasets();
      this.URBdatasets = this.datasetService.getURBDatasets();
      console.log(this.NATdatasets);
    }, 500)

  }


}
