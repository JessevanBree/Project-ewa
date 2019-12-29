import {Component, OnInit} from '@angular/core';
import {Organisation} from "../../models/organisation";
import {Dataset} from "../../models/dataset";
import {User} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganisationService} from "../../services/organisation.service";
import {UserService} from "../../services/user.service";
import {FirebaseFileService} from "../../services/firebase-file.service";
import { CmsService } from '../../services/cms.service';

@Component({
  selector: 'app-admin-organisation-panel',
  templateUrl: './admin-organisation-panel.component.html',
  styleUrls: ['./admin-organisation-panel.component.css']
})
export class AdminOrganisationPanelComponent implements OnInit {
	public CMSContent: Object;
	public readonly componentLink = "org_panel";

  // The current selected organisation in the panel
  private currentSelectedOrg: Organisation;
  // All the orgs managed by the logged in user
  private userOrganisations: Organisation[];
  // List of members of the current org
  private members: User[];
  private selectedUser: User;
  private organisationDatasets: Dataset[];
  private userIsAdminOfOrgs: boolean;
  private downloadUrl: string;

  private addMemberToggle: boolean;
  private createMemberToggle: boolean;
  private viewMemberToggle: boolean;
  private viewDatasetToggle: boolean;

  private searchFilter: String;
  private emptyList: boolean;

  constructor(private organisationService: OrganisationService,
              private userService: UserService, private fileService: FirebaseFileService,
              private router: Router,
			  private route: ActivatedRoute,
			  private cmsService: CmsService) {

    this.members = [];
    this.userOrganisations = [];
    this.selectedUser = null;
    this.userIsAdminOfOrgs = false;
    this.viewMemberToggle = false;
    this.addMemberToggle = false;
    this.createMemberToggle = false;

    this.CMSContent = {
			"ORG_PANEL_NO_ORGANISATION_MSG": "",
			"ORG_PANEL_NO_ORGANISATION_BTN": "",
		};
		this.cmsService.fillPage(this.CMSContent, this.componentLink);
  }

  // Is called when an organisation has been added from the modal (to refresh the members list)
  onAddedRequest(user: User) {
    // Update the view org first
    this.currentSelectedOrg.users.push(user);
    this.members = this.currentSelectedOrg.users;
    // Updates the organisation service which in turn updates the database
    this.organisationService.addMemberToOrg(this.currentSelectedOrg.id, user.id);
    this.createMemberToggle = false; // Close the modal
  }

  // This function is called when another organisation has been selected in the dropdown box
  orgSelectionChanged() {
    // Empty and fill the new members array
    console.log(this.currentSelectedOrg);
    this.members = [];
    this.userIsAdminOfOrgs = this.currentSelectedOrg.organisationAdmin.id == this.userService.getLoggedInUser().id;
    this.currentSelectedOrg.users.forEach(u => {
      this.members.push(u)
    });

    //Updates the datasets list when selection changed with correct results
    this.organisationService.getDatasetsByOrganisation(this.currentSelectedOrg.id).subscribe(
      (data: Dataset[]) => {
        this.organisationDatasets = data;
        console.log(data);
      }, error => {
        console.log(error)
      }
    );
  }

  // Called when the view member button has been clicked
  onViewMemberClick(member: User){
    console.log("Opening view member modal..");
    this.viewMemberToggle = true;
    this.selectedUser = member; // Fill the selectedUser variable so it can be passed in to the child view member popup modal component
  }

  // Function to delete a member from the organisation
  onDelete(member: User) {
    console.log("Current selected org: " + this.currentSelectedOrg.name);
    if (confirm("Are you sure to delete this member with the following email " + member.email + " from the following organisation " + this.currentSelectedOrg.name)) {
      this.currentSelectedOrg.users = this.members.filter(u => u.id != member.id);
      this.organisationService.deleteMemberFromOrg(this.currentSelectedOrg.id, member.id);
      this.orgSelectionChanged();
      console.log("Member has successfully been removed from the organisation");
    }
  }

  // Called when the add existing modal has been closed
  onCloseReq() {
    console.log("Closing modal..");
    this.addMemberToggle = false;
  }

  // Called when the create modal has been closed
  // onCloseReqCreate() {
  //   console.log("Closing modal..");
  //   setTimeout(() => {
  //     this.orgSelectionChanged();
  //   }, 100);
  //   this.createMemberToggle = false;
  // }

  onCreateNewMember() {
    console.log("Opening modal..");
    this.createMemberToggle = true;
  }

  onAddNewMember() {
    console.log("Opening modal..");
    this.addMemberToggle = true;
  }

  onViewDataset(datasetId: number){
    this.router.navigate(['view-dataset'], {
      relativeTo: this.route,
      queryParams: {id: datasetId}
    });
    this.viewDatasetToggle = true;
  }

  //Downloads the dataset file by retrieving the specific download url from firebase storage
  onDownload(index: number) {
    let dataset = this.organisationDatasets[index];
    this.downloadUrl = this.fileService.getDownloadUrl(dataset.fileName, dataset.id, dataset.fileType);
  }

  checkIfListEmpty(): void {
    if (this.members.length == 0) this.emptyList = true;
    setTimeout(() => {
      this.emptyList = document.getElementsByClassName("list-group-item p-1").length == 0;
    }, 5)
  }

  ngOnInit() {
    this.organisationService.getMyOrganisations().subscribe(
      (organisations: Organisation[]) => {
        console.log(organisations);
        this.userOrganisations = organisations;
        this.currentSelectedOrg = this.userOrganisations[0];
      },
      error => {
        console.log(error)
      },
      () => {
        if (this.currentSelectedOrg) {
          this.currentSelectedOrg.users.forEach(u => this.members.push(u));
          this.userIsAdminOfOrgs = this.currentSelectedOrg.organisationAdmin.id == this.userService.getLoggedInUser().id;
          console.log(this.currentSelectedOrg.organisationAdmin, this.userService.getLoggedInUser());
          console.log("Finished retrieving user's organisations");

          //Retrieves datasets of the current selected organisation
          this.organisationService.getDatasetsByOrganisation(this.currentSelectedOrg.id).subscribe(
            (datasets: Dataset[]) => {
              this.organisationDatasets = datasets;
              console.log(datasets);
            }, error => {
              console.log(error)
            },
            () => {
              console.log("Finished retrieving datasets of organisation with id: " + this.currentSelectedOrg.id);
            }
          );
        }
      }
    );
  }
}
