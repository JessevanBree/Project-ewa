import { TestBed } from '@angular/core/testing';

import { AUserService } from './a-user.service';

describe('UserService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: AUserService = TestBed.get(AUserService);
		expect(service).toBeTruthy();
	});
});
