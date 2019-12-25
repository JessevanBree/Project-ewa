import { Component, OnInit } from '@angular/core';
import { CMS } from 'src/app/models/CMS';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-admin-cms',
  templateUrl: './admin-cms.component.html',
  styleUrls: ['./admin-cms.component.css']
})
export class AdminCmsComponent implements OnInit {
	public cmsData: CMS[];
	public searchFilter: String;
	constructor(private cmsService: CmsService) {
		this.searchFilter = "";
		this.cmsService.getAllCMSContent().subscribe(
			(data: CMS[]) => {
				console.log(data)
				this.cmsData = [] = data;
			},
			(err) => console.log(err),
			() => console.log("hot stuff coming")
		)
	}

  ngOnInit() {
  }

}
