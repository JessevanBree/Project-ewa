import {Chart, ChartDataSets} from 'chart.js';

export enum RegionLevel {
  NAT_LEVEL = "National level",
  EU_LEVEL = "European level",
  URBAN_LEVEL = "Urban level"
}

export class Dataset {
  id: number;
  name: string;
  region: string;
  chartData: ChartDataSets;
  chartLabels: string[];

  constructor(id: number, name: string, region: string, chartData: ChartDataSets, chartLabels: string[]){
    this.id = id;
    this.name = name;
    this.region = region;
    this.chartData = chartData;
    this.chartLabels = chartLabels;
  }

  static trueCopy(dataset: Dataset): Dataset{
    return Object.assign(new Dataset(dataset.id, dataset.name, dataset.region, dataset.chartData, dataset.chartLabels), dataset);
  }

  static generateRandomID(){
    let randomId =  Math.floor(Math.random() * 9999);
    return randomId;
  }

  static generateRandomDataset(){
    let randomID = this.generateRandomID(); //Generates a random dataset id
    //Generates a random chart
    let chartData: ChartDataSets = Dataset.generateChartDataset();
    let chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    //Randomly selects one of the three region levels
    let regionLevels = Object.keys(RegionLevel);
    let randomPropertyName = regionLevels[Math.floor(Math.random() * 3)]
    //Randomly generates a dataset name
    let datasetName = "";
    let listOfCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for(let i = 0; i < 7; i++){
      datasetName += listOfCharacters.charAt(Math.floor(listOfCharacters.length * Math.random()));
    }
    return new Dataset(randomID, datasetName, RegionLevel[randomPropertyName], chartData, chartLabels);
  }

  static generateChartDataset(): ChartDataSets{
    let arrayNumbers: number[] = [];
    for(let i = 0; i < 6; i++) {
      let number = Math.floor(Math.random() * 3000);
      arrayNumbers.push(number);
    }
    let randomChartType = ["bar", "horizontalBar", "pie"];
    console.log(randomChartType);
    let randomNumber = Math.floor(Math.random() * randomChartType.length-1);
    let randomDataLabel = ["Eletricity consumption", "Solar power", "Houses"];
    return {type: randomChartType[0],
      data: arrayNumbers, label: randomDataLabel[Math.floor(Math.random() * randomDataLabel.length
      )],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ]
    };
  }

}
