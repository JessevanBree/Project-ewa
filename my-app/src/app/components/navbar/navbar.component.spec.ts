import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let sessionService: SpringSessionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    sessionService = fixture.debugElement.injector.get(SpringSessionService); //Get the session service
    fixture.detectChanges();
  });

  //Check if component is succesfully getting created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*//Check if user email is getting displayed in the navbar
  it('should display the user email if user is logged in', () => {

    //Get the HTML template
    let compiled = fixture.debugElement.nativeElement;
    //Expected needs to be updated to the session email of the logged in user
    expect(compiled.querySelector('#UserEmail').textContent).toContain("(User: " + sessionService.displayName + ")");
  });*/


});
