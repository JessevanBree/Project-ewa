import {Component, Input, OnInit} from '@angular/core';
// import {Dataset, RegionLevel} from "../../models/dataset";
import {Dataset, RegionLevel} from "../models/dataset";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {DatasetService} from "../services/dataset.service";
import {absFloor} from "ngx-bootstrap/chronos/utils";

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  @Input() activeIndex: number;
  private editedDataset: Dataset;
  private copyDataset: Dataset;

  public barChartOptions = {
    scaleShowVericalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
  public barChartLabels = ['2006', '2008', '2010'];
  public barChartType = 'bar';
  public barChartLegen = true;
  public barChartData = [];


  queryParamSubscription: Subscription;
  private keys = Object.keys;
  private regionLevel;

  constructor(private activatedRoute: ActivatedRoute, private datasetService: DatasetService) {
    this.editedDataset = null;
    this.regionLevel = RegionLevel;
    console.log(this.regionLevel);
  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const id = params.id;
        for (let i = 0; i < this.datasetService.getDatasets().length; i++) {
          if (this.datasetService.getDatasets()[i].id == id) {
            this.editedDataset = this.datasetService.getDatasets()[i];
            this.copyDataset = Dataset.trueCopy(this.editedDataset);
            this.barChartData = [
              {
                data: [absFloor(Math.random() * 100), absFloor(Math.random() * 100), absFloor(Math.random() * 100)],
                label: this.editedDataset.region
              }
            ]
          }
        }
        console.log(this.copyDataset);
      });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

}
