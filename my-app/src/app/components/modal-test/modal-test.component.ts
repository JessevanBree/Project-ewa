import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.css']
})
export class ModalTestComponent implements OnInit {
  uploadIsClicked: boolean = false;
  editIsClicked: boolean = false;

  constructor() {
  }

  ngOnInit() {

  }

  onUploadButtonClick() {
    this.uploadIsClicked = true;
  }

  onEditButtonClick() {
    this.editIsClicked = true;
  }
}
