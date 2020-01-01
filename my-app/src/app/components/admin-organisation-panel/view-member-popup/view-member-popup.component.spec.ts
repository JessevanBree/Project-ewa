import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberPopupComponent } from './view-member-popup.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('ViewMemberPopupComponent', () => {
  let component: ViewMemberPopupComponent;
  let fixture: ComponentFixture<ViewMemberPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemberPopupComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
