import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {SessionService} from "../../services/session/session.service";
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let sessionService: SessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    sessionService = fixture.debugElement.injector.get(SessionService); //Get the session service
    fixture.detectChanges();
  });

  //Check if component is succesfully getting created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Check if user email is getting displayed in the navbar
  it('should display the user email if user is logged in', () => {

    //Get the HTML template
    let compiled = fixture.debugElement.nativeElement;

    //Expected needs to be updated to the session email of the logged in user
    expect(compiled.querySelector('#UserEmail').textContent).toContain("(User: " + sessionService.userMail + ")");
  });

  
});
