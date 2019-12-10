import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dataset, Publicity} from "../../models/dataset";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {Subscription} from "rxjs";
import {FbSessionService} from "../../services/session/fb-session.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-edit-metadata-popup',
  templateUrl: './edit-metadata-popup.component.html',
  styleUrls: ['./edit-metadata-popup.component.css']
})
export class EditMetadataPopupComponent implements OnInit {

  keys = Object.keys;
  private Publicity = Publicity;
  private queryParamSubscription: Subscription;
  private datasets: Dataset[];
  private listOfYears: number[];

  private editingDataset: Dataset;
  @Output() savedDataset: EventEmitter<Dataset>;
  @Output() closingToggle: EventEmitter<boolean>;

  constructor(private datasetService: FirebaseDatasetService,
              private router: Router,
              private sessionService: FbSessionService,
              private activatedRoute: ActivatedRoute) {

    this.datasets = this.datasetService.getMyDatasets();
    this.savedDataset = new EventEmitter<Dataset>();
    this.closingToggle = new EventEmitter<boolean>();
    this.listOfYears = [];
    for (let i = 1980; i < 2019; i++) {
      this.listOfYears.push(i);
    }
  }

  //This method saves the edited changes of a dataset
  saveChanges() {
    this.savedDataset.emit(this.editingDataset);
  }


  onClose() {
    this.queryParamSubscription.unsubscribe();
    this.closingToggle.emit(true);
    this.router.navigate(['myuploads/', this.sessionService.displayName]);
  }

  ngOnInit() {
    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe((param: Params) => {
        const id = param.id;
        for (let i = 0; i < this.datasets.length; i++) {
          if (this.datasets[i].id == id) {
            this.editingDataset = Dataset.trueCopy(this.datasets[i]);
            console.log(this.editingDataset);
            break;
          }
        }
      }
    )
  }

}
