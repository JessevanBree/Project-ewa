import {Injectable} from '@angular/core';

//Models
import {User} from 'src/app/models/user';
import {FIRST_NAMES, SUR_NAMES} from 'src/app/models/testData';

@Injectable({
  providedIn: 'root'
})
export class AUserService {
  private users: User[];

  constructor() {
    this.users = [];

    for (let i = 0; i < 100; i++) {
      this.users.push(this.genRandomUser());
    }
    this.users.push(
      new User("Abdul", "Zor", "abdul@test.nl", "test", true),
      new User("Jesse", "Van Bree", "jesse@test.nl", "test", true),
      new User("Ferran", "Tombal", "ferran@test.nl", "test", false),
      new User("Mohamed", "Ben Ali", "mohamed@test.nl", "test", false),
      new User("Aris", "Rosbach", "aris@test.nl", "test", false),
    )
  }

  public getUser(index: number): User {
    return this.users[index];
  }

  public deleteUser(user: User): Boolean {
    let userIndex: number = this.users.indexOf(user);
    if (userIndex != -1) {
      this.users.splice(userIndex, 1)
      return this.users[userIndex].equals(user);
    } else {
      return;
    }
  }

  public addUser(user: User): Boolean {
    this.users.push(user);
    return this.users[this.users.length - 1].equals(user);
  }

  public updateUser(index: number, user: User): Boolean {
    if (!this.users[index] || !user) return false;

    this.users[index] = user;
    return this.users[index].equals(user);
  }

  getUsers(): User[] {
    return this.users;
  }

  genRandomUser(): User {
    let firstName: String = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    let surName: String = SUR_NAMES[Math.floor(Math.random() * SUR_NAMES.length)].toLowerCase();
    return new User(firstName, surName, surName + "." + firstName + "@test.edu", "test123", false);
  }
}
