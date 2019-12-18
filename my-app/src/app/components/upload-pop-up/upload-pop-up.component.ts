import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Papa} from "ngx-papaparse";
import {Dataset, Publicity, RegionLevel} from "../../models/dataset";
import {Router} from "@angular/router";
import {FirebaseFileService} from "../../services/firebase-file.service";
import {DatasetService} from "../../services/dataset.service";
import {UserService} from "../../services/user.service";
import {ChartDataSets} from "chart.js";


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

  protected nameInput: string; // Name input of metadata section
  protected descriptionInput: string; // Description input of metadata section
  protected publicityInput: string; // Publictity input of metadata section
  protected regionInput: string; // Region input of metadata section
  protected yearInput: number; // Year input of metadata section

  protected xAxisInputs: number[]; // X-axis input of visualization
  protected yAxisInput: number; // Y-axis input of visualization
  protected chartType: string; // Chart-type selection
  protected removeXAxesToggle: boolean; // Adding and removing x axes toggle
  protected confirmToggle: boolean; // Confirmation toggle for dataset visualization
  protected validationToggle: boolean; // Validation toggle to submit dataset

  private listOfYears: number[];
  private chart;
  private chartLabels: string[];

  private file: File;

  @Output() closingToggle: EventEmitter<boolean>;

  constructor(private datasetService: DatasetService, private papa: Papa,
              private userService: UserService, private fileService: FirebaseFileService,
              private router: Router) {
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
    this.regionInput = Dataset.getEnumFromValue(this.regionInput);
    let fileName = this.file.name.split(".");
    let createdDataset: Dataset = new Dataset(this.nameInput, this.regionInput,
          this.publicityInput.toUpperCase(), uploadingUser, this.yearInput, this.chart, this.chartLabels, fileName[0],
      this.descriptionInput);

    this.datasetService.saveDataset(createdDataset);
    this.fileService.saveFile(this.file, createdDataset.id, createdDataset.fileName);
    this.router.navigate(['myuploads', uploadingUser.email]);
    this.closingToggle.emit(true);
  }


  onChanges() {
    if (this.yAxisInput == null || undefined && this.xAxisInputs[0] == null || undefined) {
      this.validationToggle = false;
    } else this.validationToggle = true;
  }

  // Confirmation of csv file that has been uploaded
  onConfirm(): void {
    if (this.validationToggle == true) {
      this.confirmToggle = !this.confirmToggle;
      this.convertCSVToChartData(this.csvData);
    }
  }

  onAddXAxes(): void {
    if (this.xAxisInputs.length < 2) {
      this.xAxisInputs.push(null);
      this.removeXAxesToggle = true;
      this.validationToggle = false;
    } else if (this.xAxisInputs.length == 2) {
      this.removeXAxesToggle = false;
      this.xAxisInputs.pop();
    } else return null;
  }

  //Method that registers what file is uploaded by the user
  uploadListener(files: FileList): void {
    let arrayOfObjects = [];

    if (this.isValidCSVFile(files)) {
      this.file = files.item(0);
      this.papa.parse(this.file, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          //results is an object with the data (chartdata), metadata (headers, delimiter...)
          complete: (results) => {
            console.log(results);
            // get the data attribute from the results object and store the keys of the first data object
            // we do not get the metadata because the delimiter can be ';', otherwise the rest of the code will not work
            let csvObjects = results.data;
            this.headers = Object.keys(csvObjects[0]);
            console.log("Headers: ", this.headers);
            // check if the first element has a ';' in it. If so the headers need to be split according the ';' delimiter
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
                    }
                  }
                  //Split values and create a new object with the attributes as values that have been split
                  csvObject = csvObject[firstHeader].split(";");
                  for (let j = 0; j < this.headers.length; j++) {
                    // for each splitted header create an object with the header and value
                    let header = this.headers[j];
                    object[header] = csvObject[j];
                  }
                  arrayOfObjects.push(object);
                }
              }
            } else {
              // if delimiter is not ';', we get a normal result and store it
              arrayOfObjects = csvObjects
            }
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

  //Core method which converts the csv data to chart data/visualization
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
        //Check if second xAxix input field has been used, if it has the xAxis will be used in the header via concatination.
        if (this.xAxisInputs[1] != null || undefined) {
          let record2 = object[this.headers[this.xAxisInputs[1]]];
          recordXAxis = recordXAxis.concat(" " + record2);
        }
        //Chart data is being established
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

    // console.log(chartLabels, chartData);

    this.chart = ({
      type: this.chartType == null || undefined ? 'bar' : this.chartType,
      data: chartData,
      label: yAxisLabel
    });
    this.chartLabels = chartLabels;
  }


}
