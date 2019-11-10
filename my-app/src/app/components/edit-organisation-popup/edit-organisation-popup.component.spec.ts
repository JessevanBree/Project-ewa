import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganisationPopupComponent } from './edit-organisation-popup.component';
import {FormsModule} from "@angular/forms";

describe('EditOrganisationPopupComponent', () => {
  let component: EditOrganisationPopupComponent;
  let fixture: ComponentFixture<EditOrganisationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrganisationPopupComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganisationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
