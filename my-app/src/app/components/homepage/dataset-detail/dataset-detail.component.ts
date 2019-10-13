import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Dataset, RegionLevel} from "../models/dataset";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {DatasetService} from "../services/dataset.service";
import {ChartDataSets} from "chart.js";
import * as Chart from "chart.js";

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  @Input() activeIndex: number;
  private listDataset: Dataset;
  private editedDataset: Dataset;

  private barChartData: ChartDataSets[];
  private barChartLabels: string[];

  queryParamSubscription: Subscription;
  private keys = Object.keys;
  private regionLevel;

  constructor(private activatedRoute: ActivatedRoute, private datasetService: DatasetService) {
    this.listDataset = null;
    this.regionLevel = RegionLevel;



  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const id = params.id;
        for(let i = 0; i < this.datasetService.getDatasets().length; i++){
          if (this.datasetService.getDatasets()[i].id == id){
            this.listDataset = this.datasetService.getDatasets()[i];
            this.editedDataset = Dataset.trueCopy(this.listDataset);
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
