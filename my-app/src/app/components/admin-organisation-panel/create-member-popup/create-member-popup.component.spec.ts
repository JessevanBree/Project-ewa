import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberPopupComponent } from './create-member-popup.component';

describe('CreateMemberPopupComponent', () => {
  let component: CreateMemberPopupComponent;
  let fixture: ComponentFixture<CreateMemberPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMemberPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
