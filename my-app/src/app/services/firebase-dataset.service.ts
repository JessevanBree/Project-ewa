import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dataset} from "../models/dataset";

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatasetService {
  private datasets: Dataset[];
  private readonly DB_Datasets = "https://projectewa-a2355.firebaseio.com/Dataset.json";

  constructor(private httpClient: HttpClient) {
    this.datasets = [];
    this.getAllDatasets();
    console.log(this.datasets);
  }

  saveAllDatasets() {
    return this.httpClient.put<Dataset[]>(this.DB_Datasets, this.datasets).subscribe(
      {
        error: err => {
          console.log(err)
        }
      }
    );
  }

  getAllDatasets() {
    return this.httpClient.get<Dataset[]>(this.DB_Datasets).subscribe(
      (data: Dataset[]) => {
        data.map((o) => {
          console.log(o);
          o ? this.datasets.push(o) : [];
          });
      }
    );
  }

  getDatasets(): Dataset[]{
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

}
