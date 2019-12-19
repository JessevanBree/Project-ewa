import {Component, OnInit} from '@angular/core';

//Models
import {Organisation} from '../../../models/organisation';
import {User} from 'src/app/models/user';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute, Router} from "@angular/router";

//Services
// import {FbUserService} from 'src/app/services/fb-user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  editIsClicked: boolean;
  createIsClicked: boolean;
  activeIndex: number;
  selectedUser: User;
  searchFilter: String;
  emptyList: boolean;

  constructor(private aUserService: UserService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.activeIndex;
    this.selectedUser = null;
    this.editIsClicked;
    this.createIsClicked = false;
    this.searchFilter = "";
  }

  ngOnInit() {
    this.emptyList = this.aUserService.getUsers().length == 0;
  }

  onEditClick(originalUserIndex: number): void {
    this.editIsClicked = true;
    let userToEdit = this.aUserService.getUsers()[originalUserIndex];
    this.activeIndex = originalUserIndex;
    this.selectedUser = userToEdit;
    this.router.navigate(['editOrganisation'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: this.selectedUser.id}
    });
  }

  onCreateButtonClick() {
    this.createIsClicked = true;
  }

  createRequest($event): void {
    this.editIsClicked = false;
    this.aUserService.createUser($event).subscribe(
      (user) => {
        let u = User.trueCopy(user);
        this.aUserService.getUsers().push(u);
      },
      (err) => console.log(err));
  }

  saveRequest($event): void {
    this.editIsClicked = false;
    console.log(
      $event
    )
    this.aUserService.saveUser($event).subscribe(
      () => {
        let u = User.trueCopy($event);
        this.aUserService.getUsers()[this.activeIndex] = u;
      },
      (err) => console.log(err));
  }

  onDeleteClick(user: User) {
    if (confirm("Delete user: " + user.email)) {
      this.aUserService.deleteUser(user);
    }
  }

  checkIfListEmpty(): void {
    if (this.aUserService.getUsers().length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("admin-user-item").length == 0;
    }, 5)
  }

  popUpIsClosed($event: boolean) {
    if ($event == true) {
      this.router.navigate(['/admin']);
    }
  }
}
