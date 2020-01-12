import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberPopupComponent } from './add-member-popup.component';
import {UserFilterPipe} from "../pipes/user-filter-pipe";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OrganisationService} from "../../../services/organisation.service";
import {UserService} from "../../../services/user.service";

describe('AddMemberPopupComponent', () => {

  let addMemberPopupComponent: AddMemberPopupComponent;
  let addMemberPopupFixture: ComponentFixture<AddMemberPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberPopupComponent, UserFilterPipe ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [OrganisationService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // Setup the add member popup component
    addMemberPopupFixture = TestBed.createComponent(AddMemberPopupComponent);
    addMemberPopupComponent = addMemberPopupFixture.componentInstance;
    addMemberPopupFixture.detectChanges();
  });

  it('should create', () => {
    expect(addMemberPopupComponent).toBeTruthy();
  });

});
