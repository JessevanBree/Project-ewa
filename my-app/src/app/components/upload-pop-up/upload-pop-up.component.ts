import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Organisation} from '../../models/organisation';
import {AOrganisationService} from '../../services/a-organisation.service';
import {DatasetService} from '../../services/dataset.service';
import {DatasetDetailComponent} from "../homepage/dataset-detail/dataset-detail.component";
// import {XLSX} from '../../../../node_modules/xlsx/dist/xlsx';
import * as XLSX from 'xlsx';
import {AOA2SheetOpts} from "xlsx";
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
  private records2: any;
  private listOfYears: number[];

  constructor(private datasetService: DatasetService, private aOrganisationService: AOrganisationService) {
    this.listOfYears = [];
    for (let i = 1980; i < 2019; i++) {
      this.listOfYears.push(i);
    }
  }


  ngOnInit() {
  }


  //Retreive form data and upload new dataset
  onSubmit(form: NgForm) {
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
  uploadListener($event: any): void {
    let handle = $event;
    console.log($event.target.files[0]);


    let text = [];
    // let files = $event.srcElement.files;
    let files = $event.target.files;

    if (this.isValidCSVFile(files[0])) {
      console.log("It is valid CSV");
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

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
        console.log('error is occured while reading file!');
      };

    } else if (this.isValidXLSXFile(files[0])) {
      const target: DataTransfer = <DataTransfer>($event.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.records2 = <AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, {header: 1}));
        console.log("JDNAJKDN");
        console.log(this.records2);
      };
      reader.readAsBinaryString(target.files[0]);
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRow = [];
        for (let j = 0; j < curruntRecord.length; j++) {
          // console.log("j: " + j + "\tcurrentRecord: " + curruntRecord[j].trim());
          csvRow.push(curruntRecord[j].trim());
        }
        csvArr.push(csvRow);
        // let csvRecord: CSVRecord = new CSVRecord();
        // csvRecord.id = curruntRecord[0].trim();
        // csvRecord.firstName = curruntRecord[1].trim();
        // csvRecord.lastName = curruntRecord[2].trim();
        // csvRecord.age = curruntRecord[3].trim();
        // csvRecord.position = curruntRecord[4].trim();
        // csvRecord.mobile = curruntRecord[5].trim();
        // csvArr.push(csvRecord);
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

  //This method checks if the uploaded csv file is valid
  isValidXLSXFile(file: any) {
    // let n = /[.xls|.]/
    return file.name.endsWith(".xlsx");
  }

  ExcelToJSON(file) {


    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });

      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object);

      })

    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };

}
