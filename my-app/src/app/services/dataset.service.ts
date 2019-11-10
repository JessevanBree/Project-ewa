import { Injectable } from '@angular/core';
import {Dataset} from "../models/dataset";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  datasets: Dataset[];

  constructor() {
    this.datasets = [];
    for(let i = 0; i < 10; i++){
      // this.datasets.push(Dataset.generateRandomDataset());
    }
  }

  getDatasets(){
    return this.datasets;
  }

  getPublicDatasets(){
    return this.datasets.filter( dataset =>
      dataset.publicity.includes("Public")
    );
  }

  getEUDatasets(){
    return this.getPublicDatasets().filter( dataset =>
       dataset.region.includes("European level")
    );
  }

  getNATDatasets(){
    return this.getPublicDatasets().filter( dataset =>
      dataset.region == "National level"
    );
  }

  getURBDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region == "Urban level"
    );
  }

  public updateDataset(index:number, dataset: Dataset): Boolean {
    if( !this.datasets[index] || !dataset ) return false;

    this.datasets[index] = dataset;
    return this.datasets[index].equals(dataset);
    return null;
  }

  public addDataset(dataset: Dataset): Boolean{
    this.datasets.push(dataset);
    return this.datasets[this.datasets.length-1].equals(dataset);
    return null;
  }

  public deleteDataset(dataset: Dataset): Boolean {
    let datasetIndex: number = this.datasets.indexOf(dataset);
    if( datasetIndex != -1 ){
      this.datasets.splice(datasetIndex, 1)
      return this.datasets[datasetIndex].equals(dataset);
    } else {
      return;
    }
  }



}
