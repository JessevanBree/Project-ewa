import { TestBed } from '@angular/core/testing';

import { ADatasetService } from './a-dataset.service';

describe('DatasetService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ADatasetService = TestBed.get(ADatasetService);
		expect(service).toBeTruthy();
	});
});
