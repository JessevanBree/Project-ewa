import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  uploadIsClicked: boolean = false;
  editIsClicked: boolean = false;

  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  ngOnInit() {
  }

  onUploadButtonClick() {
    this.uploadIsClicked = true;
  }

  onEditButtonClick() {
    this.editIsClicked = true;
  }
}
