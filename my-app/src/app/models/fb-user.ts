export class FbUser {
  public email: string;
  public userId: string;
  public dateCreated: Date;
  public isAdmin: boolean;

  constructor(email: string, dateCreated: string, isAdmin?: boolean, userId?: string){
    this.email = email;
    this.isAdmin = isAdmin;
    this.dateCreated = new Date(dateCreated);
    this.userId = userId;
  }

  equals(user: FbUser): boolean{
    return this.userId == user.userId;
  }

  toString(): string{
    let toString = "User email: " + this.email + ", User ID: " + this.userId + ", Created at: "
    + this.dateCreated;
    return toString;
  }

}
