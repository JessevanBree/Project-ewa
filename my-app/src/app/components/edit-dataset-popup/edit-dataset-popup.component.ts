import {Component, Input, OnInit} from '@angular/core';
import {Dataset} from "../../models/dataset";
import { ChartDataSets } from "chart.js";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-dataset-popup',
  templateUrl: './edit-dataset-popup.component.html',
  styleUrls: ['./edit-dataset-popup.component.css']
})
export class EditDatasetPopupComponent implements OnInit {

  @Input() editingDataset: Dataset;
  private chartData: ChartDataSets[];
  private queryParamSubscription: Subscription;

  constructor() {
    // this.chartData = [this.selectedDataset.chartData];
  }

  ngOnInit() {



  }

}
