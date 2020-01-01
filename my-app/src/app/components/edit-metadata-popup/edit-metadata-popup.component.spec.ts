import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetadataPopupComponent } from './edit-metadata-popup.component';
import {ChartsModule} from "ng2-charts";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EditMetadataPopupComponent', () => {
  let component: EditMetadataPopupComponent;
  let fixture: ComponentFixture<EditMetadataPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [EditMetadataPopupComponent ],
      imports: [FormsModule, ChartsModule, NgSelectModule,
        RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMetadataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
