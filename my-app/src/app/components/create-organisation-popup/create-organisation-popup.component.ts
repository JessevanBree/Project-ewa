import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dataset, Publicity} from "../../models/dataset";
import {ADatasetService} from "../../services/a-dataset.service";
import {Organisation} from "../../models/organisation";
import {User} from "../../models/user";
import {AOrganisationService} from "../../services/a-organisation.service";
import {FbUserService} from "../../services/fb-user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-organisation-popup',
  templateUrl: './create-organisation-popup.component.html',
  styleUrls: ['./create-organisation-popup.component.css']
})
export class CreateOrganisationPopupComponent implements OnInit {

  isClicked: boolean = false;


  users: User[];

  @Input() organisation: Organisation;
  @Output() savedOrganisation = new EventEmitter<Organisation>();

  constructor(private aOrganisationService: AOrganisationService, private aUserService: FbUserService) {
    this.users = aUserService.getUsers();
  }

  ngOnInit() {
    this.isClicked = true;   // if modal is instantiated, isClicked is set to true
  }

  //This method saves the edited changes of a dataset
  onSubmit(form: NgForm) {
    let user = this.users.find(user => {
      return user.email === form.value.adminInput;
    });

    this.aOrganisationService.addOrganisation(new Organisation(form.value.nameInput,user));
  }

  private setClickedToFalse() {
    this.isClicked = false;
  }

}
