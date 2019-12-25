import { Injectable } from '@angular/core';
import { CMS } from '../models/CMS';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CmsService {
	private readonly REST_DATASETS_URL = "http://localhost:8080/cms";

	constructor(private http: HttpClient) { }

	getCMSContent(page: String): Observable<Object> {
		return this.http.get(this.REST_DATASETS_URL + "/" + page);
	}

	getAllCMSContent(): Observable<Object> {
		return this.http.get(this.REST_DATASETS_URL);
	}

	saveAllCMSContent(cmsData: CMS[]): Observable<Object> {
		return this.http.post(this.REST_DATASETS_URL, cmsData);
	}
}
