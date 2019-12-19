import {Component, OnInit} from '@angular/core';

//Models
import {Organisation} from '../../../models/organisation';
import {User} from 'src/app/models/user';

//Services
import {OrganisationService} from '../../../services/organisation.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-organisations',
  templateUrl: './admin-organisations.component.html',
  styleUrls: ['./admin-organisations.component.css']
})
export class AdminOrganisationsComponent implements OnInit {
  organisations: Organisation[];
  editIsClicked: boolean;
  createIsClicked: boolean;
  activeIndex: number;
  selectedOrganisation: Organisation;
  searchFilter: String;
  emptyList: boolean;

  constructor(private aOrganisationService: OrganisationService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.activeIndex, this.selectedOrganisation = null;
    this.editIsClicked, this.createIsClicked = false;
    this.searchFilter = "";
  }

  ngOnInit(): void {
    this.organisations = [] = this.aOrganisationService.getOrganisations();
    this.emptyList = this.organisations.length == 0;
  }

  onEditClick(originalOrganisationIndex: number): void {
    this.editIsClicked = true;
    let copyOrganisation = Organisation.trueCopy(this.aOrganisationService.getOrganisation(originalOrganisationIndex));
    this.activeIndex = originalOrganisationIndex;
    this.selectedOrganisation = copyOrganisation;
    this.router.navigate(['editOrganisation'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedOrganisation.id}
    });
  }

  onCreateButtonClick() {
    this.createIsClicked = true;
  }

  saveRequest($event): void {
    this.editIsClicked = false;
    this.organisations[this.activeIndex] = $event;
    this.aOrganisationService.updateOrganisation(this.activeIndex, this.organisations[this.activeIndex]);
  }

  onDeleteClick(org: Organisation) {
    if (confirm("Delete organisation: " + org.name)) {
      this.aOrganisationService.deleteOrganisation(org);
    }
  }

  checkIfListEmpty(): void {
    if (this.organisations.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("admin-organisation-item").length == 0;
    }, 5)
  }
}
