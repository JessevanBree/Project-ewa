import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/services/cms.service';
import { CMS } from 'src/app/models/CMS';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
	public CMSContent: Object;
	public readonly pageLink = "landing";

	constructor(private cmsService: CmsService) {
		this.CMSContent = {
			"LANDING_TITLE": "",
			"LANDING_INFO": "",
			"LANDING_BUTTON": "",
		};
		this.fillPage();
	}

	ngOnInit() {
		
	}

	/**
	 * Fills the CMSContent array which is used to fill the content in the website
	 */
	public fillPage() {
		this.cmsService.getCMSContent(this.pageLink).subscribe(
			(data: CMS[]) => {
				for(let key in this.CMSContent){
					if (!this.CMSContent.hasOwnProperty(key)) continue;

					let temp;
					if ((temp = data.find((cms: CMS) => cms.location === key)) != null) {
						this.CMSContent[key] = temp.content;
					}
				}
			},
			(err) => console.log(err),
			() => console.log("Finished retrieving component data")
		)
	}
}
