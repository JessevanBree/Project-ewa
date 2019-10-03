import { Component, OnInit } from '@angular/core';

//Model
import { Dataset } from '../../../models/dataset';

//Services
import {ADatasetService} from '../../../services/a-dataset.service';

@Component({
	selector: 'app-admin-datasets',
	templateUrl: './admin-datasets.component.html',
	styleUrls: ['./admin-datasets.component.css']
})
export class AdminDatasetsComponent implements OnInit {
	datasets: Dataset[] = [];

	constructor(private aDatasetService: ADatasetService) {
		this.datasets = aDatasetService.getDatasets();
	}

	ngOnInit() {
	}

}
