import {Organisation} from './organisation';

export class User {
	firstName: String;
	surName: String;
	mail: String;
	isAdmin: Boolean;
	organisation?: Organisation;
	isDeleted: Boolean;
	dateCreated: Date;
	dateEdited?: Date;

	constructor(firstName: String, surName: String, mail:String, isAdmin: Boolean, organisation?: Organisation) {
		this.firstName = firstName;
		this.surName = surName;
		this.mail = mail;
		this.isAdmin = isAdmin;
		this.organisation = organisation != null ? organisation : null;
		this.isDeleted = false;
		this.dateCreated = new Date(Date.now());
		this.dateEdited = new Date(Date.now());
	}
}