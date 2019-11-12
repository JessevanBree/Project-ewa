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
  protected xAxisInput: number;
  protected yAxisInput: number;

  private listOfYears: number[];
  private chart;
  private chartLabels: string[];
  private dataset: Dataset;

  @Output() closingToggle: EventEmitter<boolean>;

  constructor(private datasetService: FirebaseDatasetService, private papa: Papa,
              private userService: FbUserService, private router: Router) {
    this.listOfYears = [];
    for (let i = 1980; i < 2020; i++) {
      this.listOfYears.push(i);
    }
    this.closingToggle = new EventEmitter<boolean>();
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

  onConfirm() {
    console.log(this.xAxisInput, this.yAxisInput);
    console.log("Confirming headers..");

    this.convertCSVToChartData(this.csvData);

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
            let csvObjects = results.data;
            console.log(csvObjects[0]);

            for (let i = 0; i < csvObjects.length; i++) {
              arrayOfObjects.push(csvObjects[i]);
              this.headers = Object.keys(csvObjects[i]);
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
    let yAxisLabel: string;

    let chartLabels = [];
    let chartData = [];

    this.headers = Object.keys(objectsArray[0]);

    //Retrieves the header to use for the x and y axes
    xAxisLabel = this.headers[this.xAxisInput];
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
      let record = object[this.headers[this.xAxisInput]];
      chartLabels.push(record);
    }

    console.log(chartLabels, chartData);
    this.chart = ({
      type: 'bar',
      data: chartData,
      label: xAxisLabel
    });
    this.chartLabels = chartLabels;
  }


}
