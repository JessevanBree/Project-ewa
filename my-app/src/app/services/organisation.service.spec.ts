import {async, TestBed} from '@angular/core/testing';

import { OrganisationService } from './organisation.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "./user.service";

describe('OrganisationService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [OrganisationService]
    })
      .compileComponents();
  }));

	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: OrganisationService = TestBed.get(OrganisationService);
		expect(service).toBeTruthy();
	});
});
