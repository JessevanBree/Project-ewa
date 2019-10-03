import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// @ts-ignore
// import * as CanvasJS from 'canvasjs';

@Component({
	selector: 'app-modal-test',
	templateUrl: './modal-test.component.html',
	styleUrls: ['./modal-test.component.css']
})
export class ModalTestComponent implements OnInit {
	//   uploadIsClicked: boolean = false;
	//   editIsClicked: boolean = false;

	//   @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
	//   public context: CanvasRenderingContext2D;
	constructor() { }

	ngOnInit() {
		// let barChart = new CanvasJS.Chart("chartContainerBar", {
		//   animationEnabled: true,
		//   exportEnabled: true,
		//   title: {
		//     text: "Basic Column Chart in Angular"
		//   },
		//   data: [{
		//     type: "column",
		//     dataPoints: [
		//       {y: 71, label: "Apple"},
		//       {y: 55, label: "Mango"},
		//       {y: 50, label: "Orange"},
		//       {y: 65, label: "Banana"},
		//       {y: 95, label: "Pineapple"},
		//       {y: 68, label: "Pears"},
		//       {y: 28, label: "Grapes"},
		//       {y: 34, label: "Lychee"},
		//       {y: 14, label: "Jackfruit"}
		//     ]
		//   }]
		// });

		// barChart.render();

		// let circleChart = new CanvasJS.Chart("chartContainerCircle", {
		//   theme: "light2",
		//     animationEnabled: true,
		//   exportEnabled: true,
		//   title: {
		//     text: "Monthly Expense"
		//   },
		//   data: [{
		//     type: "pie",
		//     showInLegend: true,
		//     toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
		//     indexLabel: "{name} - #percent%",
		//     dataPoints: [
		//       {y: 450, name: "Food"},
		//       {y: 120, name: "Insurance"},
		//       {y: 300, name: "Traveling"},
		//       {y: 800, name: "Housing"},
		//       {y: 150, name: "Education"},
		//       {y: 150, name: "Shopping"},
		//       {y: 250, name: "Others"}
		//     ]
		//   }],
		//   options: {
		//     label: '# of Votes'
		//   }
		// });

		// circleChart.render();
	}
	onUploadButtonClick() {
		// this.uploadIsClicked = true;
	}

	onEditButtonClick() {
		// this.editIsClicked = true;
	}
}
