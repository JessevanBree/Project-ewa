import {User} from './user';

export class Organisation {
	name: String;
	orgAdmin: User;
	isDeleted: Boolean;
	dateCreated: Date;
	dateEdited?: Date;

	constructor(name:String, orgAdmin: User) {
		this.name = name;
		this.orgAdmin = orgAdmin;
		this.isDeleted = false;
		this.dateCreated = new Date(Date.now());
		this.dateEdited = new Date(Date.now());
	}
}