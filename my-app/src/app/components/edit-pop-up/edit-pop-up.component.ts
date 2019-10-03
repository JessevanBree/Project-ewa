import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.css']
})
export class EditPopUpComponent implements OnInit {
  isClicked: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isClicked = true;   // if modal is instantiated, isClicked is set to true
  }



  private setClickedToFalse(){
    this.isClicked = false;
  }
}
