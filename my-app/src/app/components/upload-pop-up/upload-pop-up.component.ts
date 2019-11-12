import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Papa} from "ngx-papaparse";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import {Dataset, Publicity} from "../../models/dataset";
import {FbUserService} from "../../services/fb-user.service";
import {Router} from "@angular/router";
import {ChartOptions} from "chart.js";


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

  protected nameInput: string;
  protected descriptionInput: string;
  protected publicityInput: string;
  protected regionInput: string;
  protected yearInput: number;

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
            let object = results.data;
            console.log(object[0]);

            for (let i = 0; i < object.length; i++) {
              arrayOfObjects.push(object[i]);
              Object.keys(object[i]).forEach(key => {
                let value = object[i][key];
                // console.log(value);
                if (typeof value === "string") {
                  arrayOfStrings.push(value);
                } else if (typeof value === "number") {
                  arrayOfNumber.push(value);
                }
              })
            }
            return this.convertCSVToChartData(arrayOfObjects);
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
    let valueLabel: string[] = [];
    let chartData = [];
    let chartLabels = [];
    let headers = Object.keys(objectsArray[0]);
    for (let i = 1; i < headers.length; i++) {
      valueLabel.push(headers[i]);
    }
    console.log(valueLabel[0]);
    //Retrieves the first header and the records below to define the chartlabels
    for (let i = 0; i < objectsArray.length; i++) {
      let definingHeader = headers[0];
      // console.log(objectsArray[i][definingHeader]);
      chartLabels.push(objectsArray[i][definingHeader]);
    }

    //Gets the values which are used to define a csv record example:  '# of votes'
    for (let i = 0; i < objectsArray.length; i++) {
      let object = objectsArray[i];
      console.log(object);
      for (let j = 0; j < valueLabel.length; j++) {
        console.log(object[valueLabel[j]]);
        let valueRecord = object[valueLabel[j]];
        chartData.push(valueRecord);
      }
    }

    console.log(chartLabels, chartData);
    let chartDatasets = ({
      type: 'bar',
      data: chartData,
      label: valueLabel[0]
    });

    this.chart = chartDatasets;
    this.chartLabels = chartLabels;
  }


}
