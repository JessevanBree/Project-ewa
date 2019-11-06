import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTestComponent } from './modal-test.component';
import {EditPopUpComponent} from "../edit-pop-up/edit-pop-up.component";
import {UploadPopUpComponent} from "../upload-pop-up/upload-pop-up.component";
import {FormsModule} from "@angular/forms";

describe('ModalTestComponent', () => {
  let component: ModalTestComponent;
  let fixture: ComponentFixture<ModalTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTestComponent, EditPopUpComponent,
        UploadPopUpComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
