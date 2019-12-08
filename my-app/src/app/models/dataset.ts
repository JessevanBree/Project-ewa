import {Chart, ChartDataSets, ChartOptions} from 'chart.js';
import {Organisation} from "./organisation";
import {User} from "./user";
import {ViewChild} from "@angular/core";

export enum RegionLevel {
  NAT_LEVEL = "National",
  EU_LEVEL = "European",
  URBAN_LEVEL = "Urban"
}

export enum Publicity {
  PUBLIC = "Public",
  PRIVATE = "Private",
  GROUP = "Group"
}

export class Dataset {
  id: number;
  name: string;
  region: string;
  publicity: string;
  organisation?: Organisation;
  description?: string;
  year: number;
  user: User;
  chart: ChartDataSets;
  chartLabels: string[];

  // chartOptions?: ChartOptions;


  constructor(id: number, name: string, region: string, publicity: string,
              user: User, year: number, chart: ChartDataSets, chartLabels: string[],
              description?: string, organisation?: Organisation) {
    this.id = id;
    this.name = name;
    this.region = region;
    this.publicity = publicity;
    this.year = year;
    this.user = user;
    this.description = description == null ? null : description;
    this.organisation = organisation == null ? null : organisation;
    this.chart = chart;
    this.chartLabels = chartLabels;
    // this.chartOptions = chartOptions;
  }

  equals(dataset: Dataset): boolean {
    return this.id == dataset.id;
  }

  setChart(chart: ChartDataSets, chartLabels: string[]) {
    this.chartLabels = chartLabels;
    this.chart = chart;
  }

  static trueCopy(dataset: Dataset): Dataset {
    return Object.assign(new Dataset(dataset.id, dataset.name, dataset.region,
      dataset.publicity, dataset.user, dataset.year, dataset.chart, dataset.chartLabels), dataset);
  }

  static generateRandomID() {
    let randomId = Math.floor(Math.random() * 9999);
    return randomId;
  }

  /* static generateRandomDataset() {
     let randomID = this.generateRandomID(); //Generates a random dataset id

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
     let randomUser = this.userService.getUsers()

     //Randomly generates a dataset name
     let datasetName = "";
     let listOfCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
     for (let i = 0; i < 7; i++) {
       datasetName += listOfCharacters.charAt(Math.floor(listOfCharacters.length * Math.random()));
     }
     return new Dataset(randomID, datasetName, RegionLevel[randomPropertyName], Publicity[randomPublicity],chartData, chartLabels, randomUser);
   }*/


  static generateChartDataset(): ChartDataSets {
    let arrayNumbers: number[] = [];
    for (let i = 0; i < 6; i++) {
      let number = Math.floor(Math.random() * 3000);
      arrayNumbers.push(number);
    }
    let chartType = ["bar", "horizontalBar", "pie"];


    //console.log(randomChartType);
    let randomNumber = Math.floor(Math.random() * chartType.length - 1);
    let randomDataLabel = ["Eletricity consumption", "Solar power", "Houses"];
    return ({
      type: chartType[0],
      data: arrayNumbers,
      label: randomDataLabel[Math.floor(Math.random() * randomDataLabel.length
      )],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ]
    });

    /*new Chart('canvas', {
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: arrayNumbers,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
        }]
      }
    });*/
  }

}
