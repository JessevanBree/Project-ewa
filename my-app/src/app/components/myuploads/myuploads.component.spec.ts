import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyuploadsComponent } from './myuploads.component';
import {EditPopUpComponent} from "../edit-pop-up/edit-pop-up.component";
import {UploadPopUpComponent} from "../upload-pop-up/upload-pop-up.component";
import {FormsModule} from "@angular/forms";

describe('MyuploadsComponent', () => {
  let component: MyuploadsComponent;
  let fixture: ComponentFixture<MyuploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyuploadsComponent, UploadPopUpComponent, EditPopUpComponent],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
