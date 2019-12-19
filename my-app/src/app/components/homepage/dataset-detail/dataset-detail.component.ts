import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../../../models/dataset";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {ChartDataSets} from "chart.js";
import {Papa, PapaParseModule} from "ngx-papaparse";
import {FirebaseFileService} from "../../../services/firebase-file.service";
import {DatasetService} from "../../../services/dataset.service";

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
  protected url;

  queryParamSubscription: Subscription;
  private keys = Object.keys;
  private regionLevel;
  private publicityOptions;

  constructor(private activatedRoute: ActivatedRoute,
              private datasetService: DatasetService, private fileService: FirebaseFileService,
              private papa: Papa) {
    this.listDataset = null;
    this.editedDataset = null;
    this.regionLevel = RegionLevel;
    this.publicityOptions = Publicity;
    this.listOfYears = [];
    for (let i = 1980; i < 2020; i++) {
      this.listOfYears.push(i);
    }
  }

  protected onDownload() {
    console.log("Downloading dataset..");
    /*this.papa.parse(this.url,  {
      download: true,
      complete: function (results){
        console.log(results);
      }
    });*/
  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const id = params['id'];
        console.log(this.datasetService.getDatasets());
        if(params['id']) {
          this.listDataset = this.datasetService.getDatasets().find(dataset => dataset.id == params['id']);
          this.editedDataset = Dataset.trueCopy(this.listDataset);
          console.log(this.editedDataset);
          this.url = this.fileService.getDownloadUrl(this.editedDataset.fileName, this.editedDataset.id, this.editedDataset.fileType);
          console.log(this.url);
        }
      });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }


}
