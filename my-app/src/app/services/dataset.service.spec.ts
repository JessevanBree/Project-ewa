import {async, TestBed} from '@angular/core/testing';

import { DatasetService } from './dataset.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FirebaseFileService} from "./firebase-file.service";
import {UserService} from "./user.service";

describe('DatasetService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [DatasetService]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: DatasetService = TestBed.get(DatasetService);
    expect(service).toBeTruthy();
  });
});
