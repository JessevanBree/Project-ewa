import { TestBed } from '@angular/core/testing';

import { SpringSessionService } from './spring-session.service';

describe('SpringSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpringSessionService = TestBed.get(SpringSessionService);
    expect(service).toBeTruthy();
  });
});
