import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as Chart from "chart.js";
import {DatasetService} from "../../services/dataset.service";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {FirebaseFileService} from "../../services/firebase-file.service";

@Component({
  selector: 'app-edit-dataset-popup',
  templateUrl: './view-dataset-popup.component.html',
  styleUrls: ['./view-dataset-popup.component.css']
})
export class ViewDatasetPopupComponent implements OnInit {

  @Output() closingToggle;
  private editingDataset: Dataset;
  private chartOfDataset: Chart;
  private datasets: Dataset[];
  private queryParamSubscription: Subscription;
  private pdfSource: string;


  constructor(private activatedRoute: ActivatedRoute, private datasetService: DatasetService,
              private router: Router, private sessionService: SpringSessionService,
              private fileService: FirebaseFileService) {
    this.datasets = datasetService.getMyDatasets();
    this.closingToggle = new EventEmitter<boolean>();
    this.pdfSource = null;
    // this.chartData = [this.selectedDataset.chartData];
  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
          const id = params.id;
          console.log(id);
          this.editingDataset = this.datasets.find(dataset => dataset.id == id);
          if(this.editingDataset.fileType == "pdf"){
            this.pdfSource = this.fileService.getPDFUrl(this.editingDataset.fileName, this.editingDataset.id);
            console.log(this.pdfSource);
          }

        }
      )
  }

  onClose() {
    this.queryParamSubscription.unsubscribe();
    this.closingToggle.emit(true);
    this.router.navigate(['myuploads/', this.sessionService.displayName]);
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

}
