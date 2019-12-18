import { Organisation } from './organisation';

export class User {
	public id: number;
	public firstName?: string = undefined;
	public lastName?: string = undefined;
	public password: string;
	public email: string;
	public isAdmin: boolean;
	public organisation?: Organisation;
	public dateCreated: Date;
	public dateEdited?: Date;

	constructor(email: string, password: string, isAdmin: boolean, firstName?: string,
              surName?: string, organisation?: Organisation) {
		this.email = email;
		this.password = password;
		this.isAdmin = isAdmin;
		this.firstName = firstName;
		this.lastName = surName;
		this.organisation = organisation;
		this.dateCreated = new Date(Date.now());
	}

	equals(user: User): Boolean {
		return this.id === user.id &&
			this.email === user.email &&
			this.isAdmin === user.isAdmin &&
			this.dateCreated === user.dateCreated;
	}

	// addDataset(dataset: Dataset) {
	// 	if (dataset != null) {
	// 		this.uploadedDatasets.push(dataset);
	// 	}
	// }

	tostring(): string {
		let tostring = "User email: " + this.email + ", User ID: " + this.id + ", Created at: "
			+ this.dateCreated;
		return tostring;
	}

	static trueCopy(user: User): User {
		return Object.assign(new User(null, null, null, null, null), user)
	}
}
