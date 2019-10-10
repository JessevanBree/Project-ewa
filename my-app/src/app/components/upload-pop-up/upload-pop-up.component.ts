import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {ADatasetService} from "../../services/a-dataset.service";
import {NgForm} from "@angular/forms";
import {User} from "../../models/user";
import {Organisation} from "../../models/organisation";
import {AUserService} from "../../services/a-user.service";
import {AOrganisationService} from "../../services/a-organisation.service";

declare var jQuery:any;

@Component({
  selector: 'app-upload-pop-up',
  templateUrl: './upload-pop-up.component.html',
  styleUrls: ['./upload-pop-up.component.css']
})
export class UploadPopUpComponent implements OnInit {

  newDataset: Dataset;

  @ViewChild('formElement', {static:false})
  private detailForm: NgForm;

  constructor(private aDataService: ADatasetService, private aUserService: AUserService, private aOrganisationService: AOrganisationService) { }

  ngOnInit() {
  }

  //Retreive form data and upload new dataset
  onSubmit(form: NgForm){
    let user: User = this.aUserService.genRandomUser();
    let org: Organisation = this.aOrganisationService.genRandomOrganisation();

    let newDataset = new Dataset(form.value.titleInput, form.value.description, form.value.publicityInput, user, org);

    //Add new dataset to the service
    this.aDataService.addDataset(newDataset);

    //Use JQuery to hide the modal
    jQuery('#uploadModal').modal('hide');
    this.detailForm.onReset();
  }

}
