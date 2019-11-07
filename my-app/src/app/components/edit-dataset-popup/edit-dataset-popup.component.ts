import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {ChartDataSets} from "chart.js";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {FbSessionService} from "../../services/session/fb-session.service";

@Component({
  selector: 'app-edit-dataset-popup',
  templateUrl: './edit-dataset-popup.component.html',
  styleUrls: ['./edit-dataset-popup.component.css']
})
export class EditDatasetPopupComponent implements OnInit {
  @Output() closingToggle;
  private editingDataset: Dataset;
  private datasets: Dataset[];
  private queryParamSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private datasetService: FirebaseDatasetService,
              private router: Router, private sessionService: FbSessionService) {
    this.datasets = datasetService.getMyDatasets();
    this.closingToggle = new EventEmitter<boolean>();
    // this.chartData = [this.selectedDataset.chartData];
  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const id = params.id;
        console.log(id);
          for (let i = 0; i < this.datasets.length; i++) {
            if(this.datasets[i].id == id){
              this.editingDataset = Dataset.trueCopy(this.datasets[i]);
              console.log(this.editingDataset);
              break;
            }
          }

        }
      )
  }

  onClose(){
    this.queryParamSubscription.unsubscribe();
    this.closingToggle.emit(true);
    this.router.navigate(['myuploads/', this.sessionService.displayName]);
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

}
