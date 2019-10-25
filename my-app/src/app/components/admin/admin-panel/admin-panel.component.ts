import { Component, OnInit } from '@angular/core';
import {AOrganisationService} from "../../../services/a-organisation.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  createIsClicked: boolean = false;

  constructor(private aOrganisationService: AOrganisationService) {
  }

  ngOnInit() {
  }

  onCreateButtonClick() {
    this.createIsClicked = true;
  }

}
