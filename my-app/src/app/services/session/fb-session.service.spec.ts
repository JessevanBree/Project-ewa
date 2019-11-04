import { TestBed } from '@angular/core/testing';

import { FbSessionService } from './fb-session.service';

describe('FbSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbSessionService = TestBed.get(FbSessionService);
    expect(service).toBeTruthy();
  });
});
