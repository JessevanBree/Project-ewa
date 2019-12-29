import {Pipe, PipeTransform} from '@angular/core';
import {Dataset} from "../models/dataset";
import {PaginationControlsComponent, PaginationControlsDirective, PaginationService} from "ngx-pagination";

@Pipe({
  name: 'searchArrayName'
})
export class SearchArrayNamePipe implements PipeTransform {

  // transform(array: Dataset[], args: string): any {
  // 	// only if dataset array exists filter the dataset array
  // 	if (array) {
  // 		return array.filter(item => {
  // 			return item[args[1]].toLowerCase().includes(args[0].toLowerCase())
  // 		});
  // 	}
  // }

  transform(array, args: any[], pageControls?: PaginationControlsDirective): any {
    // only if dataset array exists filter the dataset array
    // if(pageControls){
    //   pageControls.setCurrent(1);
    // }
    if (array) {
      return array.filter(item => {
        console.log(item);
        console.log(args);
        return item.name.toLowerCase().includes(args[0].toLowerCase()) || item.year == parseInt(args[0]) ||
          (item.description ? item.description.toLowerCase().includes(args[0].toLowerCase()) : null);
      });
    }
  }
}
