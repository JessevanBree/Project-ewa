import { User } from 'src/app/models/user';
import { Organisation } from 'src/app/models/organisation';

export class Dataset {
	name: String;
	uploader: User;
	organisation: Organisation;

	constructor(name: String, uploader: User, organisation: Organisation){
		this.name = name;
		this.uploader = uploader;
		this.organisation = organisation;
	}

	equals(dataset: Dataset): Boolean {
		return this.name === dataset.name &&
		this.organisation.equals(dataset.organisation) &&
		this.uploader.equals(dataset.uploader);
	}
}