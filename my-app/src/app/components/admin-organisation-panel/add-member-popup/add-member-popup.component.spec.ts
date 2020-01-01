import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberPopupComponent } from './add-member-popup.component';
import {UserFilterPipe} from "../pipes/user-filter-pipe";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OrganisationService} from "../../../services/organisation.service";
import {UserService} from "../../../services/user.service";

describe('AddMemberPopupComponent', () => {
  let component: AddMemberPopupComponent;
  let fixture: ComponentFixture<AddMemberPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberPopupComponent, UserFilterPipe ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [OrganisationService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
