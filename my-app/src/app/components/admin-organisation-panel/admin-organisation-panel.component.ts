import { Component, OnInit } from '@angular/core';
import {Organisation} from "../../models/organisation";
import {Dataset} from "../../models/dataset";
import {AdminOrganisationService} from "../../services/admin-organisation.service";
import {Subscription} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-admin-organisation-panel',
  templateUrl: './admin-organisation-panel.component.html',
  styleUrls: ['./admin-organisation-panel.component.css']
})
export class AdminOrganisationPanelComponent implements OnInit {

  // Organisation of the current logged in org admin
  adminCurrentOrg: Organisation;

  // List of members of the current org
  members: User[];

  addMemberToggle: boolean;

  constructor(private adminOrganisationService: AdminOrganisationService) {

    // Fill the members array with all the users stored in spring boot backend
    this.members = [];
    this.addMemberToggle = false;
  }

  // Function to delete a member from the organisation
  onDelete(datasetIndex: number) {
    if (confirm("Are you sure to delete this member with the following email (Member email)?")) {
      console.log("Member is succesfully deleted");
      // let selectedDataset: Dataset;
      // selectedDataset = this.datasets[datasetIndex];
      // this.datasetService.remove(selectedDataset);
      // this.datasets = this.datasetService.getMyDatasets();
    }
  }

  // This method is called when the modal is being closed
  onCloseReq() {
    console.log("Closing modal..");
    this.addMemberToggle = false;
  }

  // This function is called when the user clicks on the "add member" button to open the modal
  onAddNewMember(){
    console.log("Add new member button is clicked");
    this.addMemberToggle = true;
  }

  ngOnInit() {
    this.adminOrganisationService.getAllMembers().subscribe(
      (data: User[]) => {
        console.log(data);
        data.map(o => {
          o ? this.members.push(o) : []
        });
      }
    );
  }
}
