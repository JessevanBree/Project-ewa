import { Pipe, PipeTransform } from '@angular/core';
import { CMS } from '../models/CMS';

@Pipe({
	name: 'searchCMSArray'
})
export class SearchCMSArrayPipe implements PipeTransform {

	transform(array: CMS[], args: any[]): any {
		// only if dataset array exists filter the dataset array
		if (array) {
			return array.filter(item => {
				return item.page ? item.page.toLowerCase().includes(args[0].toLowerCase()) : false ||
					item.content ? item.content.toLowerCase().includes(args[0].toLowerCase()) : false ||
					item.adminInfo ? item.adminInfo.toLowerCase().includes(args[0].toLowerCase()) : false  ||
					item.location ? item.location.toLowerCase().includes(args[0].toLowerCase()) : false;
			});
			// return array.filter(item => {
			// 	return item.firstName ? item.firstName.toLowerCase().includes(args[0].toLowerCase()) : false ||
			// 		item.surName ? item.surName.toLowerCase().includes(args[0].toLowerCase()) : false  ||
			// 		item.email ? item.email.toLowerCase().includes(args[0].toLowerCase()) : false ;
			// });
		}
	}
}
