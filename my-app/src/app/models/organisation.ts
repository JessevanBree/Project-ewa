import {User} from './user';

export class Organisation {
  id: number;
	name: String;
	organisationAdmin: User;
	isDeleted: boolean;
	dateCreated: Date;
	dateEdited?: Date;

	constructor(name:String, orgAdmin: User) {
		this.name = name;
		this.organisationAdmin = orgAdmin;
		this.isDeleted = false;
		this.dateCreated = new Date(Date.now());
		this.dateEdited = new Date(Date.now());
	}

	equals(org: Organisation): Boolean {
		return this.name === org.name &&
		this.organisationAdmin === this.organisationAdmin &&
		this.isDeleted === org.isDeleted &&
		this.dateCreated === org.dateCreated;
	}

  static trueCopy(originalOrganisation: Organisation):Organisation{
    return Object.assign(new Organisation(null, null), originalOrganisation)
  }
}
