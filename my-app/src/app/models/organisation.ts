import { User } from './user';

export class Organisation {
	orgId: number;
	name: String;
	orgAdmin: User;
	isDeleted: Boolean;
	dateCreated: Date;
	dateEdited?: Date;

	constructor(orgId: number, name: String, orgAdmin: User) {
		this.orgId = orgId;
		this.name = name;
		this.orgAdmin = orgAdmin;
		this.isDeleted = false;
		this.dateCreated = new Date(Date.now());
		this.dateEdited = new Date(Date.now());
	}

	equals(org: Organisation): Boolean {
		return this.name === org.name &&
			this.orgAdmin.equals(org.orgAdmin) &&
			this.isDeleted === org.isDeleted &&
			this.dateCreated === org.dateCreated;
	}

	static trueCopy(originalOrganisation: Organisation): Organisation {
		return Object.assign(new Organisation(null, null, null), originalOrganisation)
	}
}
