import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPopUpComponent } from './upload-pop-up.component';
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {PapaParseModule} from "ngx-papaparse";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UploadPopUpComponent', () => {
  let component: UploadPopUpComponent;
  let fixture: ComponentFixture<UploadPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPopUpComponent ],
      imports: [FormsModule, NgSelectModule, PapaParseModule, RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
