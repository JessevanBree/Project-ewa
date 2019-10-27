import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {Organisation} from "../../models/organisation";
import {AOrganisationService} from "../../services/a-organisation.service";

@Component({
  selector: 'app-edit-organisation-popup',
  templateUrl: './edit-organisation-popup.component.html',
  styleUrls: ['./edit-organisation-popup.component.css']
})
export class EditOrganisationPopupComponent implements OnInit {

  @Input() editingOrganisation: Organisation;
  @Output() savedOrganisation: EventEmitter<Organisation> = new EventEmitter<Organisation>();

  constructor(private aOrganisationService: AOrganisationService) {
  }

  ngOnInit(): void {
  }

  onSaveChanges() {
    this.savedOrganisation.emit(this.editingOrganisation);
  }
}
