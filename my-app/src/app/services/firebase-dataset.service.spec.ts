import { TestBed } from '@angular/core/testing';

import { FirebaseDatasetService } from './firebase-dataset.service';

describe('FirebaseDatasetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseDatasetService = TestBed.get(FirebaseDatasetService);
    expect(service).toBeTruthy();
  });
});
