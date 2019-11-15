import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'searchArray'
})
export class searchArrayPipe implements PipeTransform {

	transform(array: any[], args: any[]): any {
		// only if dataset array exists filter the dataset array
		if (array) {
			return array.filter(item => {
				return item[args[1]].toLowerCase().includes(args[0].toLowerCase())
			});
		}
	}
}
