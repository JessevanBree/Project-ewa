import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Organisation} from '../../models/organisation';
import {AOrganisationService} from '../../services/a-organisation.service';
import {DatasetService} from '../../services/dataset.service';
import {DatasetDetailComponent} from "../homepage/dataset-detail/dataset-detail.component";
import { Papa } from "ngx-papaparse";

// declare var jQuery:any;

@Component({
  selector: 'app-upload-pop-up',
  templateUrl: './upload-pop-up.component.html',
  styleUrls: ['./upload-pop-up.component.css']
})
export class UploadPopUpComponent implements OnInit {

  @ViewChild('formElement', {static: false})
  private detailForm: NgForm;
  private records: any[];
  private listOfYears: number[];

  constructor(private datasetService: DatasetService,
              private aOrganisationService: AOrganisationService, private papa: Papa) {
    this.listOfYears = [];
    for (let i = 1980; i < 2019; i++) {
      this.listOfYears.push(i);
    }

  }


  ngOnInit() {
  }


  //Retreive form data and upload new dataset
  onSubmit(form: NgForm){
    //let user: User = this.datasetService.genRandomUser();
    let org: Organisation = this.aOrganisationService.genRandomOrganisation();

    //let newDataset = new Dataset(form.value.name, form.value.description, form.value.publicityInput, user, org);
    //console.log(newDataset);

    //Add new dataset to the service
    //this.datasetService.getDatasets().push(newDataset);

    // jQuery('#uploadModal').modal('hide');
    form.resetForm();
  }

  // public changeListener(files: FileList){
  //   console.log("Change listener is aangeroepen");
  //   console.log(files);
  //   if(files && files.length > 0) {
  //     let file : File = files.item(0);
  //     console.log(file.name);
  //     console.log(file.size);
  //     console.log(file.type);
  //     let reader: FileReader = new FileReader();
  //     reader.readAsText(file);
  //     reader.onload = (e) => {
  //       let csv: string = reader.result as string;
  //       console.log(csv);
  //     }
  //   }
  // }


  //Method to upload
  uploadListener(files: FileList): void {
    // let files = $event.srcElement.files;
    let arrayOfNumber = [];
    let arrayOfStrings = [];
    let arrayOfObjects = [];

    let file = files.item(0);
    this.papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          let object = results.data;
          console.log(Object.keys(object[0]));

          for (let i = 0; i < object.length; i++) {
            arrayOfObjects.push(object[i]);
            Object.keys(object[i]).forEach( key => {
              let value = object[i][key];
              // console.log(value);
              if(typeof value === "string"){
                arrayOfStrings.push(value);
              } else if(typeof value === "number" ){
                arrayOfNumber.push(value);
              }
            })
          }
        }
      }
    );


    /*if (this.isValidCSVFile(file)) {
      console.log("It is valid CSV");
      let input = file;
      let reader = new FileReader();
      reader.readAsText(file);


      reader.onload = () => {
        let csvData = reader.result;

        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        console.log(csvRecordsArray);
        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log("Headers: " + headersRow);

        console.log("Data: " + JSON.stringify(this.records[0]));
        let data = [];
        for (let i = 0; i < this.records.length; i++) {
          let hoi = [];
          for (let j = 0; j < headersRow.length; j++) {
            hoi.push();
            // data.push({headersRow[0]: })
          }
          data.push()
        }

        // let dataset1 = new Dataset(1111, this.records[0], "Urban leven", "private", )
      };

      reader.onerror = function () {
        console.log('error occurred while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }*/
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRow = [];
        for (let j = 0; j < currentRecord.length; j++) {
          console.log("j: " + j + "\tcurrentRecord: " + currentRecord[j].trim());
          csvRow.push(currentRecord[j].trim());
        }
        csvArr.push(csvRow);
       /* let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.firstName = curruntRecord[1].trim();
        csvRecord.lastName = curruntRecord[2].trim();
        csvRecord.age = curruntRecord[3].trim();
        csvRecord.position = curruntRecord[4].trim();
        csvRecord.mobile = curruntRecord[5].trim();
        csvArr.push(csvRecord);*/
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  //This method checks if the uploaded csv file is valid
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  //Reset file
  fileReset() {
    // this.csvReader.nativeElement.value = "";
    this.records = [];
  }

}
