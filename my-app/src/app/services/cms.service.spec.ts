import {TestBed} from '@angular/core/testing';

import { CmsService } from './cms.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ ],
    imports: [RouterTestingModule, HttpClientTestingModule],
    providers: [CmsService],
  }));

  it('should be created', () => {
    const service: CmsService = TestBed.get(CmsService);
    expect(service).toBeTruthy();
  });
});
