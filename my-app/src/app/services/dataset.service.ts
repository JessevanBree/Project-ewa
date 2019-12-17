import {Injectable} from '@angular/core';
import {Dataset, Publicity, RegionLevel} from "../models/dataset";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {error} from "util";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  private readonly REST_DATASETS_URL = "http://localhost:8080/datasets";
  datasets: Dataset[];

  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.datasets = [];
    this.getAllDatasets().subscribe(
      data => {
        this.datasets = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Dataset service has retrieved all datasets");
      }
    )
  }

  add(dataset: Dataset): void {
    this.datasets.push(dataset);
  }

  getAllDatasets() {
    return this.httpClient.get<Dataset[]>(this.REST_DATASETS_URL);
  }

  saveDataset(dataset: Dataset){
    return this.httpClient.post<Dataset>(this.REST_DATASETS_URL + "/upload", dataset).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Finished posting dataset");
      }
    );
  }

  getDatasets() {
    return this.datasets;
  }

  getMyDatasets() {
     return this.datasets.filter(dataset => dataset.user.id == this.userService.getLoggedInUser().id
    );
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

  generateRandomDataset() {
    let randomID = Dataset.generateRandomID(); //Generates a random dataset id
    //Generate random year
    let year: number = Math.floor(Math.random() * (2019 - 1980)) + 1980;

    //Generates a random chart
    let chart = Dataset.generateChartDataset();
    console.log(chart);
    let chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    //Randomly selects one of the three region levels
    let regionLevels = Object.keys(RegionLevel);
    let randomPropertyName = regionLevels[Math.floor(Math.random() * 3)];
    //Randomly selects one of the three publicity options
    let publicityOptions = Object.keys(Publicity);
    let randomPublicity = publicityOptions[Math.floor(Math.random() * 3)];
    //Randomly generates a user
    let randomNumber = Math.floor(this.userService.getUsers().length * Math.random());
    let randomUser = this.userService.getUsers()[randomNumber];

    //Randomly generates a dataset name
    let datasetName = "";
    let listOfCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 7; i++) {
      datasetName += listOfCharacters.charAt(Math.floor(listOfCharacters.length * Math.random()));
    }
    return new Dataset(datasetName, RegionLevel[randomPropertyName],
      Publicity[randomPublicity], randomUser, year, chart, chartLabels,
      null, null, null, randomID);
  }

}
