import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Organisation} from '../../models/organisation';
import {AOrganisationService} from '../../services/a-organisation.service';
import {DatasetService} from '../../services/dataset.service';
import {DatasetDetailComponent} from "../homepage/dataset-detail/dataset-detail.component";
import {Papa} from "ngx-papaparse";

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

  //Method to upload
  uploadListener(files: FileList): void {
    // let files = $event.srcElement.files;
    if (this.isValidCSVFile(files)) {
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
          }
        }
      );
    }else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
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
