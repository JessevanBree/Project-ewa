import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganisationPanelComponent } from './admin-organisation-panel.component';
import {AddMemberPopupComponent} from "./add-member-popup/add-member-popup.component";
import {CreateMemberPopupComponent} from "./create-member-popup/create-member-popup.component";
import {ViewMemberPopupComponent} from "./view-member-popup/view-member-popup.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ViewDatasetPopupComponent} from "../view-dataset-popup/view-dataset-popup.component";
import {UserFilterPipe} from "./pipes/user-filter-pipe";
import {FormsModule} from "@angular/forms";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {ChartsModule} from "ng2-charts";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AdminOrganisationPanelComponent', () => {
  let component: AdminOrganisationPanelComponent;
  let fixture: ComponentFixture<AdminOrganisationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganisationPanelComponent , AddMemberPopupComponent,
      CreateMemberPopupComponent, ViewMemberPopupComponent, ViewDatasetPopupComponent,
      UserFilterPipe],
      imports: [FormsModule, ChartsModule, PdfViewerModule, RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganisationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
