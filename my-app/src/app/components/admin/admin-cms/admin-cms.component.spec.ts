import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCmsComponent } from './admin-cms.component';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchCMSArrayPipe} from "../../../pipes/search-cms-array.pipe";

describe('AdminCmsComponent', () => {
  let component: AdminCmsComponent;
  let fixture: ComponentFixture<AdminCmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCmsComponent, SearchCMSArrayPipe ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
