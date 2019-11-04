import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dataset} from "../models/dataset";

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatasetService {
  private datasets: Dataset[];
  private readonly DB_DATASETS = 'https://projectewa-a2355.firebaseio.com/Dataset.json';

  constructor(private httpClient: HttpClient) {
    this.datasets = [];
    this.getAllDatasets();
    //console.log(this.datasets);
  }

  getDatasets(): Dataset[] {
    return this.datasets;
  }

  updateDataset(index: number, dataset: Dataset): boolean{
    this.datasets[index] = dataset;
    this.saveAllDatasets();
    return true;
  }

  deleteDataset(selectedDataset: Dataset): boolean{
    this.datasets = this.datasets.filter( dataset => {
      dataset != selectedDataset
    });
    this.saveAllDatasets();
    return true;
  }

  saveAllDatasets() {
    return this.httpClient.put<Dataset[]>(this.DB_DATASETS, this.datasets).subscribe(
      {
        error: err => {
          console.log(err)
        }
      }
    );
  }

  getAllDatasets() {
    // return this.httpClient.get<Dataset[]>(this.DB_DATASETS);
    return this.httpClient.get<Dataset[]>(this.DB_DATASETS).subscribe(
      (data: Dataset[]) => {
        console.log(data);
        data.map((o) => {o ? this.datasets.push(o) : []});
      }
    );
  }

  getPublicDatasets(){
    return this.getDatasets().filter( dataset =>
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

}
