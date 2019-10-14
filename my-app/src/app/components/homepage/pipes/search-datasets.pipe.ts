import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDatasets'
})
export class SearchDatasetsPipe implements PipeTransform {

  transform(value: any[], args): any {
    return value.filter( eachItem => {
      return eachItem['name'].toLowerCase().includes(args.toLowerCase())
    });
  }

}
