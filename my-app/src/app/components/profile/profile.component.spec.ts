import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../services/user.service";
import {DatasetService} from "../../services/dataset.service";
import {SpringSessionService} from "../../services/session/spring-session.service";
import {CmsService} from "../../services/cms.service";
import {User} from "../../models/user";
import {Observable, of} from "rxjs";

fdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let componentHTML: HTMLElement;

  let userService: UserService;

  let profileUserSimple = new User("ab1@test.nl", true);
  let profileUserComplex = new User("ab2@test.nl", true, "Test", "Ing", "pass");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent, EditProfileComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [UserService, DatasetService, SpringSessionService, CmsService]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    componentHTML = fixture.debugElement.nativeElement;

    userService = TestBed.get(UserService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(userService).toBeTruthy();
  });


  it('should show no user firstname and surname if not existing', async(() => {
    // first the getAllUsers needs to be called, so that the ngOnInit getAllUsers returns the profileUserSimple
    let spy = spyOn(userService, "getAllUsers").and.returnValue(of([profileUserSimple]));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(component.userCopy.firstName).toBe(undefined);
      expect(component.userCopy.surName).toBeUndefined();
    });
  }));

  it('should show user firstname and surname if existing', async(() => {
    // first the getAllUsers needs to be called, so that the ngOnInit getAllUsers returns the profileUserComplex
    let spy = spyOn(userService, "getAllUsers").and.returnValue(of([profileUserComplex, profileUserSimple]));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.userCopy.firstName).toBeDefined();
      expect(component.userCopy.surName).toBeDefined();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.userCopy.firstName).toBe(profileUserComplex.firstName);
      expect(component.userCopy.surName).toBe(profileUserComplex.surName);

      fixture.detectChanges();
      expect(componentHTML.querySelector("#full-name").innerHTML)
        .toContain(profileUserComplex.firstName + " " + profileUserComplex.surName);
    });
  }));

  it('should transform firstname and suname to input fields for editing user firstname and surname', async(() => {
    // first the getAllUsers needs to be called, so that the ngOnInit getAllUsers returns the profileUserComplex
    let spy = spyOn(userService, "getAllUsers").and.returnValue(of([profileUserComplex, profileUserSimple]));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.updateButtonToggle).toBeTruthy();

      let editButton: HTMLButtonElement = componentHTML.querySelector(".name-edit-button");
      editButton.click();

      fixture.detectChanges();
      expect(component.updateButtonToggle).toBeFalsy();
      expect(componentHTML.querySelector("#firstName")).toBeTruthy();
      expect(componentHTML.querySelector("#surName")).toBeTruthy();
      expect(componentHTML.querySelector("#firstName").getAttribute("ng-reflect-model")).toBe(profileUserComplex.firstName);
    });
  }));

  fit('should edit user firstName and surName if Update is clicked', async(() => {
    // first the getAllUsers needs to be called, so that the ngOnInit getAllUsers returns the profileUserComplex
    let spy = spyOn(userService, "getAllUsers").and.returnValue(of([profileUserSimple]));
    component.ngOnInit();
    fixture.whenStable().then(() => {
      // if user clicks edit button to edit user firstName and surName
      fixture.detectChanges();
      let editButton: HTMLButtonElement = componentHTML.querySelector(".name-edit-button");
      editButton.click();
      fixture.detectChanges();
      //TODO:: HIJ VERANDERD updateButtonToggle niet naar false

      // If user saves the updated firstName and surName
      console.log(componentHTML);
      let updateButton: HTMLButtonElement = componentHTML.querySelector("#updateButton");
      updateButton.click();
      fixture.detectChanges();

      console.log(componentHTML.querySelector("#full-name").getAttributeNames());

      expect(componentHTML.querySelector("#full-name").getAttribute("ng-reflect-model"))
        .toContain(profileUserComplex.firstName + " " + profileUserComplex.surName);
    });
  }));

});
