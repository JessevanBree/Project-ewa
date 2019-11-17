import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetOverviewComponent } from './dataset-overview.component';
import {DatasetDetailComponent} from "../dataset-detail/dataset-detail.component";
import {Dataset} from "../../../models/dataset";
import {RegionFiltersPipe} from "../pipes/region-filters.pipe";
import {searchArrayPipe} from "../../../pipes/search-array.pipe";
import {FormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {RouterTestingModule} from "@angular/router/testing";

describe('DatasetOverviewComponent', () => {
  let component: DatasetOverviewComponent;
  let fixture: ComponentFixture<DatasetOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetOverviewComponent, DatasetDetailComponent, RegionFiltersPipe,
        searchArrayPipe ],
      imports: [FormsModule, ChartsModule, RouterTestingModule]
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
});
