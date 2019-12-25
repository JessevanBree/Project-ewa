import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';
import { CMS } from 'src/app/models/CMS';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
	public title: String;
	public info: String;
	public buttonText: String;
	constructor(private cmsService: CmsService) {

		this.cmsService.getCMSContent("landing").subscribe(
			(data: CMS[]) => {
				console.log(data);
				
				let temp;
				if ((temp = data.find((cms: CMS) => cms.location === "LANDING_TITLE")) != null) {
					this.title = temp.content;
				}

				if ((temp = data.find((cms: CMS) => cms.location === "LANDING_INFO")) != null) {
					this.info = temp.content;
				}

				if ((temp = data.find((cms: CMS) => cms.location === "LANDING_BUTTON")) != null) {
					this.buttonText = temp.content;
				}
				
			},
			(err) => console.log(err)
		)
	}

	ngOnInit() {
		
	}
}
