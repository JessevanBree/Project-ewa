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
  protected removeXAxesToggle: boolean;
  protected confirmToggle: boolean;

  private listOfYears: number[];
  private chart;
  private chartLabels: string[];
  // private chartOptions;
  // private dataset: Dataset;

  @Output() closingToggle: EventEmitter<boolean>;

  constructor(private datasetService: FirebaseDatasetService, private papa: Papa,
              private userService: FbUserService, private router: Router) {
    this.listOfYears = [];
    for (let i = 1980; i < 2020; i++) {
      this.listOfYears.push(i);
    }
    this.closingToggle = new EventEmitter<boolean>();
    this.confirmToggle = false;
    this.xAxisInputs = [null];
  }

  ngOnInit() {
  }

  //Retreive form data and upload new dataset
  onSubmit(form: NgForm) {
    console.log(this.descriptionInput, this.nameInput, this.publicityInput.trim(), this.regionInput, this.yearInput);
    let uploadingUser = this.userService.getLoggedInUser();
    console.log(uploadingUser);

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
      this.removeXAxesToggle = true;
    } else if (this.xAxisInputs.length == 2) {
      this.removeXAxesToggle = false;
      this.xAxisInputs.pop();
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
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log(results);
            let csvObjects = results.data;
            this.headers = Object.keys(csvObjects[0]);
            console.log("Headers: ", this.headers);
            if (this.headers[0].includes(";")) {
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
                      console.log(this.headers);
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
                }
              }
            } else {
              arrayOfObjects = csvObjects
            }
            // arrayOfObjects = csvObjects;
            this.csvData = arrayOfObjects;
            console.log(this.csvData);
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
    let yAxisLabel: string;

    let chartLabels = [];
    let chartData = [];

    //Retrieves the header to use for the x and y axes
    xAxisLabel = this.headers[this.xAxisInputs[0]];
    yAxisLabel = this.headers[this.yAxisInput];
    console.log(xAxisLabel, yAxisLabel);

    //Retrieves the records from the csv file in order to visualize the charts
    if (objectsArray.length > 150) {
      for (let i = 0; i < 100; i++) {
        let object = objectsArray[i];
        let recordYAxis = object[this.headers[this.yAxisInput]];
        let recordXAxis = object[this.headers[this.xAxisInputs[0]]];
        console.log(recordXAxis, recordYAxis);

        if (this.xAxisInputs[1] != null || undefined) {
          let record2 = object[this.headers[this.xAxisInputs[1]]];
          recordXAxis = recordXAxis.concat(" " + record2);
        }
        //Chart data
        chartData.push(recordYAxis);
        chartLabels.push(recordXAxis);
      }
      console.log(chartLabels, chartData);
    } else for (let i = 0; i < objectsArray.length; i++) {
      let object = objectsArray[i];
      let recordYAxis = object[this.headers[this.yAxisInput]];
      let recordXAxis = object[this.headers[this.xAxisInputs[0]]];

      if (this.xAxisInputs[1] != null || undefined) {
        let record2 = object[this.headers[this.xAxisInputs[1]]];
        recordXAxis = recordXAxis.concat(" " + record2);
      }
      //Chart data
      chartData.push(recordYAxis);
      chartLabels.push(recordXAxis);
    }

    console.log(chartLabels, chartData);

    this.chart = ({
      type: 'bar',
      data: chartData,
      label: yAxisLabel
    });
    this.chartLabels = chartLabels;
  }


}
