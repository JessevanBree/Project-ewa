import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMetadataComponent } from './view-metadata.component';

describe('ViewMetadataComponent', () => {
  let component: ViewMetadataComponent;
  let fixture: ComponentFixture<ViewMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
