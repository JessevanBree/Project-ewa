import { TestBed } from '@angular/core/testing';

import { FbUserService } from './fb-user.service';

describe('FbUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbUserService = TestBed.get(FbUserService);
    expect(service).toBeTruthy();
  });
});
