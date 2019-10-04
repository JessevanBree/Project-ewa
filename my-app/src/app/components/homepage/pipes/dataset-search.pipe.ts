import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datasetSearch'
})
export class DatasetSearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
