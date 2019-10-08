import {Component, OnInit} from '@angular/core';
import {Dataset} from "../models/dataset";
import {DatasetService} from "../services/dataset.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SearchDatasetsPipe} from "../pipes/search-datasets.pipe";

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

  private selectedDataset: Dataset;
  private activeIndex: number;
  private searchQuery: any;

  constructor(private datasetService: DatasetService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.datasets = datasetService.getDatasets();
    this.EUdatasets =  datasetService.getEUDatasets();
    this.NATdatasets = datasetService.getNATDatasets();
    this.URBdatasets = datasetService.getURBDatasets();

    console.log(this.datasets);
    console.log(this.NATdatasets);
    console.log(this.URBdatasets);
    this.activeIndex = null;
    this.searchQuery = "";
    console.log(this.EUdatasets);

  }

  onEUSelection(index) {
    this.activeIndex = index;
    this.selectedDataset = this.EUdatasets[this.activeIndex];
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    });
  }

  onSearch() {
    console.log("Search button clicked!")
    this.datasets.filter(eachItem => {
        return eachItem['name'].toLowerCase().includes(this.searchQuery.toLowerCase())
    });


  }

  ngOnInit() {

  }

}
