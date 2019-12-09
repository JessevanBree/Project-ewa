import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganisationPanelComponent } from './admin-organisation-panel.component';

describe('AdminOrganisationPanelComponent', () => {
  let component: AdminOrganisationPanelComponent;
  let fixture: ComponentFixture<AdminOrganisationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganisationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganisationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
