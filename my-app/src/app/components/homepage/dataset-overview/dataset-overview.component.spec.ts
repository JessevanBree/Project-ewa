import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetOverviewComponent } from './dataset-overview.component';
import {DatasetDetailComponent} from "../dataset-detail/dataset-detail.component";
import {RegionFiltersPipe} from "../pipes/region-filters.pipe";
import {SearchArrayNamePipe} from "../../../pipes/search-array.pipe";
import {FormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {RouterTestingModule} from "@angular/router/testing";
import {NgxPaginationModule} from "ngx-pagination";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PapaParseModule} from "ngx-papaparse";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import * as firebase from "firebase";

describe('DatasetOverviewComponent', () => {
  let component: DatasetOverviewComponent;
  let componentHTML: HTMLElement;
  let fixture: ComponentFixture<DatasetOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetOverviewComponent, DatasetDetailComponent, RegionFiltersPipe,
        SearchArrayNamePipe],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ChartsModule,
        NgxPaginationModule, PdfViewerModule, PapaParseModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a dataset table', () => {
    componentHTML = fixture.nativeElement;
    let table: HTMLTableElement = componentHTML.querySelector("table");
    expect(table).toBeDefined();
  })
});
