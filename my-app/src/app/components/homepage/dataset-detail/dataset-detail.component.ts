import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../../../models/dataset";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {DatasetService} from "../../../services/dataset.service";
import {ChartDataSets} from "chart.js";
import {FirebaseDatasetService} from "../../../services/firebase-dataset.service";

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  @Input() activeIndex: number;
  private listDataset: Dataset;
  public listOfYears: number[];
  private editedDataset: Dataset;

  private barChartData: ChartDataSets[];
  private barChartLabels: string[];

  queryParamSubscription: Subscription;
  private keys = Object.keys;
  private regionLevel;
  private publicityOptions;

  constructor(private activatedRoute: ActivatedRoute, private datasetService: FirebaseDatasetService) {
    this.listDataset = null;
    this.regionLevel = RegionLevel;
    this.publicityOptions = Publicity;
    this.listOfYears = [];
    for (let i = 1980; i < 2020; i++) {
      this.listOfYears.push(i);
    }
  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const id = params.id;
        console.log(params);
        for(let i = 0; i < this.datasetService.getDatasets().length; i++){
          if (this.datasetService.getDatasets()[i].id == id){
            this.listDataset = this.datasetService.getDatasets()[i];
            this.editedDataset = Dataset.trueCopy(this.listDataset);
            console.log(this.editedDataset);
            this.barChartData = [this.editedDataset.chartData];
            this.barChartLabels = this.editedDataset.chartLabels;
          }
        }
      });
  }

  ngOnDestroy(){
    this.queryParamSubscription.unsubscribe();
  }


}
