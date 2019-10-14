import { Injectable } from '@angular/core';
import {Dataset} from "../models/dataset";

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  datasets: Dataset[];

  constructor() {
    this.datasets = [];
    for(let i = 0; i < 10; i++){
      this.datasets.push(Dataset.generateRandomDataset());
    }
  }

  getDatasets(){
    return this.datasets;
  }

  getEUDatasets(){
    return this.datasets.filter( dataset =>
       dataset.region.includes("European level")
    );
  }

  getNATDatasets(){
    return this.datasets.filter( dataset =>
      dataset.region == "National level"
    );
  }

  getURBDatasets(){
    return this.datasets.filter( dataset =>
      dataset.region == "Urban level"
    );
  }



}
