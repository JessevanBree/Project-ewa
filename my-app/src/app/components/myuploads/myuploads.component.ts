import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myuploads',
  templateUrl: './myuploads.component.html',
  styleUrls: ['./myuploads.component.css']
})
export class MyuploadsComponent implements OnInit {

  datasets: object;

  constructor() {
    //Construct some fake datasets
    this.datasets = [
      {"title":"Energy productivity", "publicity":"Private"},
      {"title":"Electricity prices by type of use", "publicity":"Registered users"},
      {"title":"Total energy supply by product", "publicity":"Public"},
      {"title":"Final energy consumption by sector", "publicity":"Private"},
      {"title":"Energy balances", "publicity":"Private"},
      {"title":"Energy flow", "publicity":"Registered users"},
      {"title":"Share of energy from renewable sources", "publicity":"Public"}
    ]

  }

  ngOnInit() {
  }

}
