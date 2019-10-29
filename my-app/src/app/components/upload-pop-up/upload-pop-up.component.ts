import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {ADatasetService} from "../../services/a-dataset.service";
import {NgForm} from "@angular/forms";
import {User} from "../../models/user";
import {Organisation} from "../../models/organisation";
import {AUserService} from "../../services/a-user.service";
import {AOrganisationService} from "../../services/a-organisation.service";

// declare var jQuery:any;

@Component({
  selector: 'app-upload-pop-up',
  templateUrl: './upload-pop-up.component.html',
  styleUrls: ['./upload-pop-up.component.css']
})
export class UploadPopUpComponent implements OnInit {

  @ViewChild('formElement', {static:false})
  private detailForm: NgForm;

  public records: any[] = [];
  @ViewChild('csvReader', {static: false}) csvReader: any;

  constructor(private aDataService: ADatasetService, private aUserService: AUserService, private aOrganisationService: AOrganisationService) { }

  ngOnInit() {
  }

  //Retreive form data and upload new dataset
  onSubmit(form: NgForm){
    let user: User = this.aUserService.genRandomUser();
    let org: Organisation = this.aOrganisationService.genRandomOrganisation();

    let newDataset = new Dataset(form.value.titleInput, form.value.description, form.value.publicityInput, user, org);
    // console.log(newDataset);

    //Add new dataset to the service
    this.aDataService.addDataset(newDataset);

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
    let text = [];
    // let files = $event.srcElement.files;
    let files = $event.target.files;

    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

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
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.firstName = curruntRecord[1].trim();
        csvRecord.lastName = curruntRecord[2].trim();
        csvRecord.age = curruntRecord[3].trim();
        csvRecord.position = curruntRecord[4].trim();
        csvRecord.mobile = curruntRecord[5].trim();
        csvArr.push(csvRecord);
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
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

}
