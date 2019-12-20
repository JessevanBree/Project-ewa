import { TestBed } from '@angular/core/testing';

import { AdminOrganisationService } from './admin-organisation.service';

describe('AdminOrganisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminOrganisationService = TestBed.get(AdminOrganisationService);
    expect(service).toBeTruthy();
  });
});
