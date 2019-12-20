import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dataset} from "../../models/dataset";
import {Organisation} from "../../models/organisation";
import {OrganisationService} from "../../services/organisation.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-edit-organisation-popup',
  templateUrl: './edit-organisation-popup.component.html',
  styleUrls: ['./edit-organisation-popup.component.css']
})
export class EditOrganisationPopupComponent implements OnInit {

  // @Input() editingOrganisation: Organisation;
  @Output() savedOrganisation: EventEmitter<Organisation> = new EventEmitter<Organisation>();

  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private queryParamSubscription: Subscription;
  private selectedOrg: Organisation;
  private editingOrg: Organisation;
  private editingOrgAdminEmail: string;
  private memberToAdd: string;


  constructor(private organisationService: OrganisationService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryParamSubscription =
      this.route.queryParams.subscribe((params) => {
          const id = params['id'];
          console.log(id);
          this.selectedOrg = this.organisationService.getOrganisations().find(org => org.id == id);
          this.editingOrg = Organisation.trueCopy(this.selectedOrg);
          this.editingOrgAdminEmail = this.editingOrg.organisationAdmin.email;
        }
      );
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  onSaveChanges() {
    // this.savedOrganisation.emit(this.editingOrg);
    this.editingOrg.organisationAdmin = this.userService.getUserByEmail(this.editingOrgAdminEmail);
    this.savedOrganisation.emit(this.editingOrg);
  }

  onClose() {
    this.closed.emit(true);
    // this.savedOrganisation.emit(this.editingOrg);
  }

  addMember(email: string) {
    let user: User = this.userService.getUserByEmail(email);
    if (user == null || undefined || email == null || undefined
      || this.editingOrg.users.includes(user) || this.editingOrg.organisationAdmin.id === user.id) return;
    this.editingOrg.addUser(user);
    this.organisationService.addMemberToOrg(this.editingOrg.id, user.id);
    this.memberToAdd = null;
  }
}
