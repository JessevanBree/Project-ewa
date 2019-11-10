import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetadataPopupComponent } from './edit-metadata-popup.component';

describe('EditMetadataPopupComponent', () => {
  let component: EditMetadataPopupComponent;
  let fixture: ComponentFixture<EditMetadataPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMetadataPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMetadataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
