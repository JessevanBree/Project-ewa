import {Organisation} from './organisation';

export class User {
  public id: number;
  public email: string;
  public passWord: string;
  public firstName?: string;
  public surName?: string;
  public dateCreated: Date;
  public isAdmin: boolean;
  public organisations?: Organisation[] = [];
  public adminOfOrganisations: Organisation[];


  constructor(email: string, isAdmin: boolean, firstName?: string,
              surName?: string, password?: string, organisation?: Organisation) {
    this.email = email;
    this.passWord = password;
    this.isAdmin = isAdmin;
    this.firstName = firstName;
    this.surName = surName;
    this.dateCreated = new Date(Date.now());
    this.organisations.push(organisation);
  }

  equals(user: User): boolean {
    return this.id === user.id &&
      this.email === user.email &&
      this.isAdmin === user.isAdmin &&
      this.dateCreated === user.dateCreated;
  }

  tostring(): string {
    let tostring = "User email: " + this.email + ", User ID: " + this.id + ", Created at: "
      + this.dateCreated;
    return tostring;
  }

  static trueCopy(user: Object): User {
    return Object.assign(new User(null, null, null, null, null, null), user)
  }


}
