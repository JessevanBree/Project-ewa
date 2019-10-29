import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Dataset} from '../../models/dataset';
import {NgForm} from '@angular/forms';
import {User} from '../../models/user';
import {Organisation} from '../../models/organisation';
import {AUserService} from '../../services/a-user.service';
import {AOrganisationService} from '../../services/a-organisation.service';
import {DatasetService} from '../../services/dataset.service';

// declare var jQuery:any;

@Component({
  selector: 'app-upload-pop-up',
  templateUrl: './upload-pop-up.component.html',
  styleUrls: ['./upload-pop-up.component.css']
})
export class UploadPopUpComponent implements OnInit {

  @ViewChild('formElement', {static: false})
  private detailForm: NgForm;

  constructor(private datasetService: DatasetService, private aOrganisationService: AOrganisationService) { }

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

}
