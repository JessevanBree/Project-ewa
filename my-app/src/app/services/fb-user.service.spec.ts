import { TestBed } from '@angular/core/testing';

import {AUserService} from './fb-user.service';

describe('AUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AUserService = TestBed.get(AUserService);
    expect(service).toBeTruthy();
  });
});
