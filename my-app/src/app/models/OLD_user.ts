import { Organisation } from './organisation';
import { Dataset } from "./dataset";

export class User {

	firstName: String;
	surName: String;
	mail: String;
	password: String;
	isAdmin: Boolean;
	organisation?: Organisation;
	isDeleted: Boolean;
	dateCreated: Date;
	uploadedDatasets: Dataset[];
	dateEdited?: Date;

	constructor(firstName: String, surName: String, mail: String, password: String, isAdmin: Boolean, uploadedDatasets?: Dataset[], organisation?: Organisation) {
		this.firstName = firstName;
		this.surName = surName;
		this.mail = mail;
		this.password = password;
		this.isAdmin = isAdmin;
		this.uploadedDatasets = uploadedDatasets == null ? null : uploadedDatasets;
		this.organisation = organisation != null ? organisation : null;
		this.isDeleted = false;
		this.dateCreated = new Date(Date.now());
		this.dateEdited = new Date(Date.now());
	}

	equals(user: User): Boolean {
		return this.firstName === user.firstName &&
			this.surName === user.surName &&
			this.mail === user.mail &&
			this.password === user.password &&
			this.isAdmin === user.isAdmin &&
			this.organisation === user.organisation &&
			this.isDeleted === user.isDeleted &&
			this.dateCreated === user.dateCreated;
	}

	addDataset(dataset: Dataset) {
		if (dataset != null) {
			this.uploadedDatasets.push(dataset);
		}
	}
	
	static trueCopy(user: User): User {
		return Object.assign(new User(null, null, null, null, null, null), user)
	}
}
