import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../../models/dataset";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DatasetService} from "../../services/dataset.service";
import {SessionService} from "../../services/session/session.service";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-metadata-popup',
  templateUrl: './edit-metadata-popup.component.html',
  styleUrls: ['./edit-metadata-popup.component.css']
})
export class EditMetadataPopupComponent implements OnInit {

  keys = Object.keys;
  private Publicity = Publicity;
  private RegionLevel = RegionLevel;
  private queryParamSubscription: Subscription;
  private datasets: Dataset[];
  private listOfYears: number[];

  private editingDataset: Dataset;
  @Output() savedDataset: EventEmitter<Dataset>;
  @Output() closingToggle: EventEmitter<boolean>;

  constructor(private datasetService: DatasetService,
              private router: Router,
              private sessionService: SpringSessionService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    let userId: number = userService.getLoggedInUser().id;
    this.datasets = this.datasetService.getMyDatasets();
    this.savedDataset = new EventEmitter<Dataset>();
    this.closingToggle = new EventEmitter<boolean>();
    this.listOfYears = [];
    for (let i = 1980; i < 2020; i++) {
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
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute
    });
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
