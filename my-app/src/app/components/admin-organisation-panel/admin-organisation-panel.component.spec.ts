import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganisationPanelComponent } from './admin-organisation-panel.component';
import {AddMemberPopupComponent} from "./add-member-popup/add-member-popup.component";
import {CreateMemberPopupComponent} from "./create-member-popup/create-member-popup.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

import {ViewDatasetPopupComponent} from "../view-dataset-popup/view-dataset-popup.component";
import {UserFilterPipe} from "./pipes/user-filter-pipe";
import {FormsModule} from "@angular/forms";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ChartsModule} from "ng2-charts";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OrganisationService} from "../../services/organisation.service";

describe('AdminOrganisationPanelComponent', () => {

  let adminOrganisationComponent: AdminOrganisationPanelComponent;
  let adminOrganisationFixture: ComponentFixture<AdminOrganisationPanelComponent>;

  let addMemberPopupComponent: AddMemberPopupComponent;
  let addMemberPopupFixture: ComponentFixture<AddMemberPopupComponent>;

  let createMemberPopupComponent: CreateMemberPopupComponent;
  let createMemberPopupFixture: ComponentFixture<CreateMemberPopupComponent>;

  let organisationService: OrganisationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganisationPanelComponent , AddMemberPopupComponent,
      CreateMemberPopupComponent, ViewDatasetPopupComponent,
      UserFilterPipe],
      imports: [FormsModule, ChartsModule, PdfViewerModule, RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  // Set everything up and create the components
  beforeEach(() => {
    // Setup the admin organisation component
    adminOrganisationFixture = TestBed.createComponent(AdminOrganisationPanelComponent);
    adminOrganisationComponent = adminOrganisationFixture.componentInstance;
    adminOrganisationFixture.detectChanges();

    // Setup the add member popup component
    addMemberPopupFixture = TestBed.createComponent(AddMemberPopupComponent);
    addMemberPopupComponent = addMemberPopupFixture.componentInstance;
    addMemberPopupFixture.detectChanges();

    // Setup the create member popup component
    createMemberPopupFixture = TestBed.createComponent(CreateMemberPopupComponent);
    createMemberPopupComponent = createMemberPopupFixture.componentInstance;
    createMemberPopupFixture.detectChanges();

    // Setup the services of the components
    organisationService = adminOrganisationFixture.debugElement.injector.get(OrganisationService);
  });

  // Actual frontend tests
  it('should create the admin organisation component', () => {
    expect(adminOrganisationComponent).toBeTruthy();
  });

  it('it should create the add member popup component', () => {
    expect(addMemberPopupComponent).toBeTruthy();
  });

  it('it should create the create member popup component', () => {
    expect(createMemberPopupComponent).toBeTruthy();
  });

  // Example of how to test a service of a component
  // it('should get organisations from the backened', () =>{
  //   // expect(organisationService.getAllOrganisations().length).not.toEqual(0);
  // });

});
