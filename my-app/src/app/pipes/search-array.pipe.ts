import {Pipe, PipeTransform} from '@angular/core';
import {Dataset} from "../models/dataset";
import {PaginationControlsComponent, PaginationControlsDirective, PaginationService} from "ngx-pagination";

@Pipe({
  name: 'searchArrayName',
  pure: false
})
export class SearchArrayNamePipe implements PipeTransform {

  // transform(array: Dataset[], args: string): any {
  // 	// only if dataset array exists filter the dataset array
  // 	if (array) {
  // 		return array.filter(organisation => {
  // 			return organisation[args[1]].toLowerCase().includes(args[0].toLowerCase())
  // 		});
  // 	}
  // }

  transform(array, args: any[], pageControls?: PaginationControlsDirective): any {
   // Page controls necessary for pagination module
    if (pageControls) {
      pageControls.setCurrent(1);
    }
    // only if dataset array exists filter the dataset array
    if (array) {
      return array.filter(item => {
        if (item.description) {
          return item.name.toLowerCase().includes(args[0].toLowerCase()) || item.year == parseInt(args[0]) ||
            item.description.toLowerCase().includes(args[0].toLowerCase());
        } else return item.name.toLowerCase().includes(args[0].toLowerCase());

      });
    }
  }
}
