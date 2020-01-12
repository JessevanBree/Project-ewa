import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganisationPanelComponent } from './admin-organisation-panel.component';
import {AddMemberPopupComponent} from "./add-member-popup/add-member-popup.component";
import {CreateMemberPopupComponent} from "./create-member-popup/create-member-popup.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

import {ViewMetadataComponent} from "../view-metadata/view-metadata.component";
import {ViewDatasetPopupComponent} from "../view-dataset-popup/view-dataset-popup.component";
import {UserFilterPipe} from "./pipes/user-filter-pipe";
import {FormsModule} from "@angular/forms";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ChartsModule} from "ng2-charts";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OrganisationService} from "../../services/organisation.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

/**
 * @Author Ferran Tombal
 */
describe('AdminOrganisationPanelComponent', () => {

  let adminOrganisationComponent: AdminOrganisationPanelComponent;
  let adminOrganisationFixture: ComponentFixture<AdminOrganisationPanelComponent>;
  let adminOrganisationElement: DebugElement;

  let organisationService: OrganisationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganisationPanelComponent , AddMemberPopupComponent,
        CreateMemberPopupComponent, ViewDatasetPopupComponent, ViewMetadataComponent,
        UserFilterPipe],
      imports: [FormsModule, ChartsModule, PdfViewerModule, RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
      .compileComponents(); // Compile the components HTML and CSS
  }));

  // Set everything up and create the components
  beforeEach(() => {
    // Setup the admin organisation component
    adminOrganisationFixture = TestBed.createComponent(AdminOrganisationPanelComponent);
    adminOrganisationComponent = adminOrganisationFixture.componentInstance;
    adminOrganisationElement = adminOrganisationFixture.debugElement;
    adminOrganisationFixture.autoDetectChanges();

    // Setup the services of the component
    organisationService = adminOrganisationFixture.debugElement.injector.get(OrganisationService);
  });

  // Check if the component has been compiled successfully
  it('should create the admin organisation component', () => {
    expect(adminOrganisationComponent).toBeTruthy();
  });

  // Check if the componentLink property contains the text "org_panel"
  it('componentLink property should contain `org_panel`', () => {
    expect(adminOrganisationComponent.componentLink).toBe('org_panel');
  });

  // Check if the boolean toggles to open the popups are working correctly
  it('should toggle the `addMemberToggle` boolean (to open the add member popup)', () => {
    expect(adminOrganisationComponent.addMemberToggle).toBeFalsy();
    adminOrganisationComponent.onAddNewMember();
    expect(adminOrganisationComponent.addMemberToggle).toBeTruthy();
  });

  it('should toggle the `createMemberToggle` boolean (to open the create member popup)', () => {
    expect(adminOrganisationComponent.createMemberToggle).toBeFalsy();
    adminOrganisationComponent.onCreateNewMember();
    expect(adminOrganisationComponent.createMemberToggle).toBeTruthy();
  });

  it('should toggle the `viewDatasetToggle` boolean (to open the view dataset popup)', () => {
    expect(adminOrganisationComponent.viewDatasetToggle).toBeFalsy();
    adminOrganisationComponent.onViewDataset(0);
    expect(adminOrganisationComponent.viewDatasetToggle).toBeTruthy();
  });

  // TODO getting HTML elements does not work, (TypeError: Cannot read property 'nativeElement' of null)

  // Check if elements rendered properly in the DOM
  // it('should have an H4 tag of `Select an organisation`', () => {
  //   expect(adminOrganisationElement.query(By.css('.selectAnOrg')).nativeElement.innerText).toBe('Select an organisation');
  // });

  // Example of how to test a service of a component
  // it('should get organisations from the backend', () =>{
  //   // expect(organisationService.getAllOrganisations().length).not.toEqual(0);
  // });

});
