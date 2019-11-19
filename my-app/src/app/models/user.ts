import { Organisation } from './organisation';
import { observable } from 'rxjs';

export class User {
	public userId: string;
	public firstName?: string;
	public surName?: string;
	public password: string;
	public email: string;
	public isAdmin: boolean;
	public organisation?: Organisation;
	public dateCreated: Date;
	public dateEdited?: Date;

	constructor(userId: string, email: string, password: string, isAdmin: boolean, firstName?: string,
              surName?: string, organisation?: Organisation) {
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.isAdmin = isAdmin;
		this.firstName = firstName;
		this.surName = surName;
		this.organisation = organisation;
		this.dateCreated = new Date(Date.now());
	}

	equals(user: User): Boolean {
		return this.userId === user.userId &&
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
		let tostring = "User email: " + this.email + ", User ID: " + this.userId + ", Created at: "
			+ this.dateCreated;
		return tostring;
	}

	static trueCopy(user: User): User {
		return Object.assign(new User(user.userId, user.email, user.password, user.isAdmin, user.firstName, user.surName, user.organisation), user)
	}
}
