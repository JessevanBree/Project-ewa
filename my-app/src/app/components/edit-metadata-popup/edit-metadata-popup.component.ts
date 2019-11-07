import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dataset, Publicity} from "../../models/dataset";
import {DatasetService} from "../../services/dataset.service";

@Component({
  selector: 'app-edit-metadata-popup',
  templateUrl: './edit-metadata-popup.component.html',
  styleUrls: ['./edit-metadata-popup.component.css']
})
export class EditMetadataPopupComponent implements OnInit {

  isClicked: boolean = false;

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
