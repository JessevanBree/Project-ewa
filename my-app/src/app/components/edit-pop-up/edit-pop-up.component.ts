import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Dataset, Publicity} from "../../models/dataset";
import {ADatasetService} from "../../services/a-dataset.service";
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import {DatasetService} from "../../services/dataset.service";

declare var jQuery:any;

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.css']
})
export class EditPopUpComponent implements OnInit {

  isClicked: boolean = false;

  //Publicity selectbox
  keys = Object.keys;
  private Publicity = Publicity;

  @Input() editingDataset: Dataset;
  @Output() savedDataset = new EventEmitter<Dataset>();

  constructor(private datasetService: DatasetService) { }

  //This method saves the edited changes of a dataset
  saveChanges(){
    this.savedDataset.emit(this.editingDataset);
  }

  private setClickedToFalse(){
    this.isClicked = false;
  }

  ngOnInit() {
    this.isClicked = true;   // if modal is instantiated, isClicked is set to true
  }
}
