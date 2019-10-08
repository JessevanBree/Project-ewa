import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPopUpComponent } from './upload-pop-up.component';

describe('UploadPopUpComponent', () => {
  let component: UploadPopUpComponent;
  let fixture: ComponentFixture<UploadPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
