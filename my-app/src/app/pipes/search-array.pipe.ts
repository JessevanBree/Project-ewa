import {Pipe, PipeTransform} from '@angular/core';
import {Dataset} from "../models/dataset";
import {PaginationControlsComponent, PaginationControlsDirective, PaginationService} from "ngx-pagination";

@Pipe({
  name: 'searchArrayName',
  pure: false
})
export class SearchArrayNamePipe implements PipeTransform {
  transform(array, args: string[], pageControls?: PaginationControlsDirective): any {
    // Page controls necessary for pagination module
    if (pageControls) {
      pageControls.setCurrent(1);
    }
    // only if dataset array exists filter the dataset array
    if (array && args) {
      return array.filter(item => {
        return item.name.toLowerCase().includes(args[0].toLowerCase()) || item.year == parseInt(args[0]) ||
        item.description ? item.description.toLowerCase().includes(args[0].toLowerCase()) : null;
      });
    } else
      return array;
  }
}
