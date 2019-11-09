import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dataset, Publicity, RegionLevel} from "../models/dataset";
import * as firebase from "firebase";
import {ChartDataSets} from "chart.js";
import {FbUserService} from "./fb-user.service";
import {FbUser} from "../models/fb-user";

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatasetService {
  private datasets: Dataset[];
  private readonly DB_DATASETS = 'https://projectewa-a2355.firebaseio.com/Datasets.json';

  constructor(private httpClient: HttpClient, private userService: FbUserService) {
    this.userService.getAllUsers();
    this.getAllDatasets();
    this.datasets = [];

    /*setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      console.log(this.userService.getUsers().length);
      this.datasets.push(this.generateRandomDataset())
    }
    console.log(this.datasets);
    this.saveAllDatasets();}, 5000);*/

  }

  //Function getUploaded datasets
  // returns datasets uploaded by user

  getDatasets(): Dataset[] {
    return this.datasets;
  }

  updateDataset(index: number, dataset: Dataset): boolean {
    this.datasets[index] = dataset;
    this.saveAllDatasets();
    console.log("Dataset is updated");
    return true;
  }

  remove(selectedDataset: Dataset): boolean {
    this.datasets = this.datasets.filter(dataset =>
      dataset.id != selectedDataset.id
    );
    this.saveAllDatasets();
    return true;
  }

  add(dataset: Dataset): boolean{
    this.datasets.push(dataset);
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
        if(data != null){
          data.map((o) => {
            o ? this.datasets.push(o) : []
          });
          console.log(this.datasets);
        }
      }
    );
  }

  getMyDatasets() {
    let user = this.userService.getLoggedInUser();
    return this.getDatasets().filter(dataset =>
      dataset.user.userId == user.userId
    )
  }

  getPublicDatasets() {
    return this.getDatasets().filter(dataset =>
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

  generateRandomDataset() {
    let randomID = Dataset.generateRandomID(); //Generates a random dataset id
    //Generate random year
    let year: number = Math.floor(Math.random() * (2019 - 1980)) + 1980;

    //Generates a random chart
    let chartData: ChartDataSets = Dataset.generateChartDataset();
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
    return new Dataset(randomID, datasetName, RegionLevel[randomPropertyName],
      Publicity[randomPublicity], chartData, chartLabels, randomUser, year);
  }

  ngOnInit() {
    let firebaseConfig = {
      apiKey: "AIzaSyCihkANi0RepQRSxrqVV6N2GZ9hkgico8A",
      authDomain: "projectewa-a2355.firebaseapp.com",
      databaseURL: "https://projectewa-a2355.firebaseio.com",
      projectId: "projectewa-a2355",
      storageBucket: "projectewa-a2355.appspot.com",
      messagingSenderId: "115134291690",
      appId: "1:115134291690:web:9ea9338d1a34eef2308193",
      measurementId: "G-JYBDHXR76P"
    };
    firebase.initializeApp(firebaseConfig);
  }

}
