import {Component, OnInit, ViewChild} from '@angular/core';
import {Dataset} from "../../../models/dataset";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FirebaseDatasetService} from "../../../services/firebase-dataset.service";
import {FbUserService} from "../../../services/fb-user.service";
import {FbSessionService} from "../../../services/session/fb-session.service";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dataset-overview',
  templateUrl: './dataset-overview.component.html',
  styleUrls: ['./dataset-overview.component.css']
})
export class DatasetOverviewComponent implements OnInit {
  private readonly datasets: Dataset[];
  private copyDatasets: Dataset[];

  // if subscribing wants to be done in the view component
  private datasets$: Observable<Dataset[]>;

  // private filters: {} = {regionSearch: null, publicitySearch: null};
  @ViewChild('formElement', {static: false})
  private detailForm: NgForm;

  private regionSearch: string = "";
  private publicitySearch: string = "";

  private selectedDataset: Dataset;
  private activeIndex: number;
  private searchQuery: any;

  constructor(private datasetService: FirebaseDatasetService, private router: Router,
              private activatedRoute: ActivatedRoute, private userService: FbUserService,
              private sessionService: FbSessionService) {
    this.datasets = [];
    this.activeIndex = null;
    this.searchQuery = '';

    this.regionSearch = "All regions";
    this.publicitySearch = "All shared";

  }

  onSelection(index: number, dataset: Dataset) {
    this.activeIndex = index;
    this.selectedDataset = this.copyDatasets[this.activeIndex];
    this.router.navigate(['detail'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedDataset.id}
    });
  }

  /**
   * Filter the datasets per region and/or publicity from the
   * given inputs of the select boxes.
   */
  onFilter(): void {
    if ((this.regionSearch !== "" && this.regionSearch !== null) && (this.publicitySearch !== "" && this.publicitySearch !== null)) {
      // reset the copyDatasets to the orgininal complete dataset array
      this.copyDatasets = this.datasets;

      // if 'no' filters are selected return
      if ((this.publicitySearch === "All shared" || this.publicitySearch === "Publicity") &&
        this.regionSearch === "All regions") {
        console.log("IF1");
        return;
        // if only region has filterable input
      } else if (this.publicitySearch === "All shared" || this.publicitySearch === "Publicity") {
        console.log("IF2");
        this.copyDatasets = this.copyDatasets.filter(dataset => {
          return dataset.region.trim().toLowerCase().includes(this.regionSearch.trim().split(' ')[0].toLowerCase());
        });
        // if only publicity has filterable input
      } else if (this.regionSearch === "All regions") {
        console.log("IF3");
        this.copyDatasets = this.copyDatasets.filter(dataset => {
          return dataset.publicity.trim().toLowerCase().includes(this.publicitySearch.trim().split(' ')[0].toLowerCase());
        });
        // if both filters have filterable input
      } else {
        console.log("IF4");
        this.copyDatasets = this.copyDatasets.filter(dataset => {
          return dataset.region.trim().toLowerCase().includes(this.regionSearch.trim().split(' ')[0].toLowerCase()) &&
            dataset.publicity.trim().toLowerCase().includes(this.publicitySearch.trim().split(' ')[0].toLowerCase());
        });
      }
      this.copyDatasets.forEach(dataset => {
        console.log("Dataset name: " + dataset.name + "\nDataset publ: " + dataset.publicity + "\nRegion lvl: " +
          dataset.region + "\n");
      });
      // if only one input is selected !!!!TODO:: If selected in selectbox is fixed you can delete this part
    } else {
      this.copyDatasets = this.datasets;
    }
  }

  ngOnInit() {
    /*this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        console.log("in overview id=" + params['id']);
        this.activeIndex = params['id'];
        this.selectedDataset = this.datasets.find(dataset => dataset.id === Number.parseInt(String [params['id']]));
        console.log("overview Index: " + this.activeIndex);
      }
    );*/

    // subscribing in the view component
    this.datasets$ = this.datasetService.getAllDatasets2();

    // subscribe to get all the datasets
    this.datasetService.getAllDatasets2().subscribe(
      (data: Dataset[]) => {
       if(data != null && this.sessionService.displayName != null || undefined){
          let userEmail: String = this.sessionService.displayName;
          data.map((o) => {
            o.publicity.includes("Public") || o.user.email == userEmail ?
              this.datasets.push(o) : [];
          });
        } else if (data != null) {
          // push each dataset to the dataset array
          data.map((o) => {
            o.publicity === "Public" ? this.datasets.push(o) : [];
          });
        }
      },
      // log the existing error to the console
      (error) => (console.log("Error: " + error)),
      // when 'complete' make a new array which is a
      // copy of the datasets array with other memory location
      () => {
        this.copyDatasets = Object.assign([], this.datasets);
      }
    );
  }
}
