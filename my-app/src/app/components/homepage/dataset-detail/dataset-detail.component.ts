import {Component, Input, OnInit} from '@angular/core';
import {Dataset, RegionLevel} from "../models/dataset";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {DatasetService} from "../services/dataset.service";

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  @Input() activeIndex: number;
  private editedDataset: Dataset;
  private copyDataset: Dataset;

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
        for(let i = 0; i < this.datasetService.getDatasets().length; i++){
          if (this.datasetService.getDatasets()[i].id == id){
            this.editedDataset = this.datasetService.getDatasets()[i];
            this.copyDataset = Dataset.trueCopy(this.editedDataset);
          }
        }
        console.log(this.copyDataset);
      });
  }

  ngOnDestroy(){
    this.queryParamSubscription.unsubscribe();
  }

}
