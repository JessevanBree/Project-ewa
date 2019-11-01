import {Organisation} from './organisation';

export class User {

  firstName: String;
  surName: String;
  mail: String;
  password: String;
  isAdmin: Boolean;
  organisation?: Organisation;
  isDeleted: Boolean;
  dateCreated: Date;
  dateEdited?: Date;

  constructor(firstName: String, surName: String, mail: String, password: String, isAdmin: Boolean, organisation?: Organisation) {
    this.firstName = firstName;
    this.surName = surName;
    this.mail = mail;
    this.password = password;
    this.isAdmin = isAdmin;
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
}
