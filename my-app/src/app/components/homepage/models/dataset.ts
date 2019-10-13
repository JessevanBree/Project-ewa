import {Chart} from 'chart.js';

export enum RegionLevel {
  NAT_LEVEL = "National level",
  EU_LEVEL = "European level",
  URBAN_LEVEL = "Urban level"
}

export class Dataset {
  id: number;
  name: string;
  region: string;
  chartData: Chart;

  constructor(id: number, name: string, region: string){
    this.id = id;
    this.name = name;
    this.region = region;
  }

  static trueCopy(dataset: Dataset): Dataset{
    return Object.assign(new Dataset(dataset.id, dataset.name, dataset.region), dataset);
  }

  static generateRandomID(){
    let randomId =  Math.floor(Math.random() * 9999);
    return randomId;
  }

  static generateDataset(){
    let randomID = this.generateRandomID();
    let datasetName = "";
    let regionLevels = Object.keys(RegionLevel);
    let randomPropertyName = regionLevels[Math.floor(Math.random() * 3)]
    let listOfCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for(let i = 0; i < 7; i++){
      datasetName += listOfCharacters.charAt(Math.floor(listOfCharacters.length * Math.random()));
    }
    return new Dataset(randomID, datasetName, RegionLevel[randomPropertyName]);
  }

  static generateChart(): Chart{
    let ctx = 'myChart'
    return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Energy',
            data: [12, 19, 14, 16, 2, 3],
            backgroundColor:[
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ]
          }]
        }
      }
    )
  }
}
