import {Injectable} from '@angular/core';
import {Dataset} from "../models/dataset";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {error} from "util";

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  private readonly REST_DATASETS_URL = "http://localhost:8080/datasets";
  datasets: Dataset[];

  constructor(private httpClient: HttpClient) {
    this.datasets = [];
    this.getAllDatasets();

  }

  getAllDatasets() {
    this.httpClient.get<Dataset[]>(this.REST_DATASETS_URL).subscribe(
      (data) => {
        this.datasets = data;
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Retrieved all datasets");
      }
    )

  }

  getDatasets() {
    return this.datasets;
  }

  getPublicDatasets() {
    return this.datasets.filter(dataset =>
      dataset.publicity.includes("Public")
    );
  }

  getEUDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region.includes("European level")
    );
  }

  getNATDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region == "National level"
    );
  }

  getURBDatasets() {
    return this.getPublicDatasets().filter(dataset =>
      dataset.region == "Urban level"
    );
  }

  public updateDataset(index: number, dataset: Dataset): Boolean {
    if (!this.datasets[index] || !dataset) return false;

    this.datasets[index] = dataset;
    return this.datasets[index].equals(dataset);
    return null;
  }

  public addDataset(dataset: Dataset): Boolean {
    this.datasets.push(dataset);
    return this.datasets[this.datasets.length - 1].equals(dataset);
    return null;
  }

  public deleteDataset(dataset: Dataset): Boolean {
    let datasetIndex: number = this.datasets.indexOf(dataset);
    if (datasetIndex != -1) {
      this.datasets.splice(datasetIndex, 1)
      return this.datasets[datasetIndex].equals(dataset);
    } else {
      return;
    }
  }


}
