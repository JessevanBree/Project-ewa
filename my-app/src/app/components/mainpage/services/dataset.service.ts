import { Injectable } from '@angular/core';
import {Dataset} from "../models/dataset";

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  datasets: Dataset[];

  constructor() {
    this.datasets = [new Dataset(Dataset.generateRandomID(), "Dataset 1"), new Dataset(Dataset.generateRandomID(), "Dataset 2")];
  }

  getDatasets(){
    return this.datasets;
  }

}
