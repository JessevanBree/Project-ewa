import { TestBed } from '@angular/core/testing';

import { AOrganisationService } from './a-organisation.service';

describe('OrganisationService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: AOrganisationService = TestBed.get(AOrganisationService);
		expect(service).toBeTruthy();
	});
});
