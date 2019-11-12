import {Pipe, PipeTransform} from '@angular/core';
import {Dataset} from "../../../models/dataset";

@Pipe({
  name: 'searchDatasets'
})
export class SearchDatasetsPipe implements PipeTransform {

  transform(datasets: Dataset[], args): any {
    // only if dataset array exists filter the dataset array
    if (datasets) {
      return datasets.filter(eachItem => {
        return eachItem['name'].toLowerCase().includes(args.toLowerCase())
      });
    }
  }


}
