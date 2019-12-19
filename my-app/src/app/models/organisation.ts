import {User} from './user';

export class Organisation {
  id: number;
	name: String;
	orgAdmin: User;
	isDeleted: boolean;
	dateCreated: Date;
	dateEdited?: Date;

	constructor(name:String, orgAdmin: User) {
		this.name = name;
		this.orgAdmin = orgAdmin;
		this.isDeleted = false;
		this.dateCreated = new Date(Date.now());
		this.dateEdited = new Date(Date.now());
	}

	equals(org: Organisation): Boolean {
		return this.name === org.name &&
		this.orgAdmin === this.orgAdmin &&
		this.isDeleted === org.isDeleted &&
		this.dateCreated === org.dateCreated;
	}

  static trueCopy(originalOrganisation: Organisation):Organisation{
    return Object.assign(new Organisation(null, null), originalOrganisation)
  }
}
