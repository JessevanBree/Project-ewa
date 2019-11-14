import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Papa} from "ngx-papaparse";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {Dataset} from "../../models/dataset";
import {FbUserService} from "../../services/fb-user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-upload-pop-up',
  templateUrl: './upload-pop-up.component.html',
  styleUrls: ['./upload-pop-up.component.css']
})
export class UploadPopUpComponent implements OnInit {

  @ViewChild('formElement', {static: false})
  @ViewChild('csvReader', {static: false})
  @ViewChild('uploadModal', {static: false}) private uploadModal;

  private detailForm: NgForm;
  private csvReader: NgForm;
  private headers: string[];
  private csvData: object[];

  protected nameInput: string;
  protected descriptionInput: string;
  protected publicityInput: string;
  protected regionInput: string;
  protected yearInput: number;

  protected xAxisInputs: number[];
  protected yAxisInput: number;
  protected confirmToggle: boolean;

  private listOfYears: number[];
  private chart;
  private chartLabels: string[];
  // private chartOptions;
  private dataset: Dataset;

  @Output() closingToggle: EventEmitter<boolean>;

  constructor(private datasetService: FirebaseDatasetService, private papa: Papa,
              private userService: FbUserService, private router: Router) {
    this.listOfYears = [];
    for (let i = 1980; i < 2020; i++) {
      this.listOfYears.push(i);
    }
    this.closingToggle = new EventEmitter<boolean>();
    this.confirmToggle = false;
    this.xAxisInputs = [2];
  }

  ngOnInit() {
  }

  //Retreive form data and upload new dataset
  onSubmit(form: NgForm) {
    console.log(this.descriptionInput, this.nameInput, this.publicityInput.trim(), this.regionInput, this.yearInput);
    let uploadingUser = this.userService.getLoggedInUser();
    let createdDataset: Dataset = new Dataset(Dataset.generateRandomID(), this.nameInput, this.regionInput,
      this.publicityInput, uploadingUser, this.yearInput, this.chart, this.chartLabels, this.descriptionInput);
    this.datasetService.getDatasets().push(createdDataset);
    this.closingToggle.emit(true);
    this.datasetService.saveAllDatasets();
    this.router.navigate(['myuploads', uploadingUser.email])

    // form.resetForm();
  }

  onConfirm(): void {
    this.confirmToggle = !this.confirmToggle;
    if (this.confirmToggle == true) {
      this.convertCSVToChartData(this.csvData);
    }
  }

  onAddXAxes(): void {
    if (this.xAxisInputs.length < 2) {
      this.xAxisInputs.push(null);
    } else return null;
  }

  //Method to upload
  uploadListener(files: FileList): void {
    let arrayOfNumber = [];
    let arrayOfStrings = [];
    let arrayOfObjects = [];

    if (this.isValidCSVFile(files)) {

      let file = files.item(0);
      this.papa.parse(file, {
          delimiter: "",
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            let csvObjects = results.data;
            console.log(csvObjects[0]);
            this.headers = Object.keys(csvObjects[0]);
            console.log("Headers: ", this.headers);

            for (let i = 0; i < csvObjects.length; i++) {
              let firstHeader = Object.keys(csvObjects[i])[0];
              let csvObject = csvObjects[i];
              let object = {};

              //If one of the headers or values contains ; then split them accordingly and check the other headers
              if (csvObject[firstHeader].includes(";")) {
                //Check if headers contains semicolons and split them accordingly
                for (let j = 0; j < this.headers.length; j++) {
                  if (this.headers[j].includes(";")) {
                    this.headers = this.headers[j].split(";");
                  }
                }
                //Split values and create a new object with the attributes as values that have been split
                csvObject = csvObject[firstHeader].split(";");
                for (let j = 0; j < this.headers.length; j++) {
                  let header = this.headers[j];
                  object[header] = csvObject[j];
                  console.log(object);
                }
                arrayOfObjects.push(object);
              } else arrayOfObjects.push(csvObjects[i]);
              console.log(arrayOfObjects);

              // Experimental code for testing purposes
              Object.keys(csvObjects[i]).forEach(key => {
                let value = csvObjects[i][key];
                // console.log(value);
                if (typeof value === "string") {
                  arrayOfStrings.push(value);
                } else if (typeof value === "number") {
                  arrayOfNumber.push(value);
                }
              })
            }
            this.csvData = arrayOfObjects;
            return this.csvData;
          }
        }
      );
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  //This method checks if the uploaded csv file is valid
  isValidCSVFile(files: FileList) {
    return files.item(0).name.endsWith(".csv");
  }


  //Reset file
  fileReset() {
    // this.csvReader.form.reset();
    this.detailForm.controls['fileInput'].reset();
  }


  convertCSVToChartData(objectsArray: any[]): void {
    let xAxisLabel: string;
    let xAxisLabel2: string;
    let yAxisLabel: string;

    let chartLabels = [];
    let chartData = [];

    // Retrieves all the headers of the first record in the csv file
    // this.headers = Object.keys(objectsArray[0]);
    /*for (let i = 0; i < this.headers.length; i++) {
      if(this.headers[i].includes(";")){
        let header = this.headers[i];
        this.headers = header.split(";");
      }
    }
*/
    //Retrieves the header to use for the x and y axes
    xAxisLabel = this.headers[this.xAxisInputs[0]];
    xAxisLabel = xAxisLabel.concat(";").concat(this.headers[this.xAxisInputs[1]]);
    yAxisLabel = this.headers[this.yAxisInput];

    console.log(xAxisLabel, yAxisLabel);
    //Retrieves the records for the y axis
    for (let i = 0; i < objectsArray.length; i++) {
      let object = objectsArray[i];
      let record = object[this.headers[this.yAxisInput]];
      chartData.push(record);
    }

    //Retrieves the records for the x axis
    for (let i = 0; i < objectsArray.length; i++) {
      let object = objectsArray[i];
      let record = object[this.headers[this.xAxisInputs[0]]];
      let record2 = object[this.headers[this.xAxisInputs[1]]];
      record = record.concat(" " + record2);
      chartLabels.push(record);
    }

    console.log(chartLabels, chartData);
    this.chart = ({
      type: 'bar',
      data: chartData,
      label: yAxisLabel
    });
    this.chartLabels = chartLabels;
    /*this.chartOptions = {
        scales: {
          xAxes: [
            {
              id: 'xAxis1',
              type: "category",
              ticks: {
                callback: function (label) {
                  let xAxis1 = label.split(";")[0];
                  let xAxis2 = label.split(";")[1];
                  console.log(xAxis1);
                  return xAxis2;
                }
              }
            }, {
              id: 'xAxis2',
              type: "category",
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                callback: function (label) {
                  let xAxis1 = label.split(";")[0];
                  let xAxis2 = label.split(";")[1];
                  console.log(xAxis2);
                  return xAxis1;
                }
              }
            }
          ]
        }
      }*/
    }


}
