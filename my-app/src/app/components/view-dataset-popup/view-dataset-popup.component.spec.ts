import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDatasetPopupComponent } from './view-dataset-popup.component';

describe('EditDatasetPopupComponent', () => {
  let component: ViewDatasetPopupComponent;
  let fixture: ComponentFixture<ViewDatasetPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDatasetPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDatasetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
