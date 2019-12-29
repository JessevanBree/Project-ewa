import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberPopupComponent } from './view-member-popup.component';

describe('ViewMemberPopupComponent', () => {
  let component: ViewMemberPopupComponent;
  let fixture: ComponentFixture<ViewMemberPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemberPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
