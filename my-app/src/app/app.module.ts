import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPopUpComponent } from './components/edit-pop-up/edit-pop-up.component';
import { UploadPopUpComponent } from './components/upload-pop-up/upload-pop-up.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminOrganisationsComponent } from './components/admin/admin-organisations/admin-organisations.component';
import { AdminDatasetsComponent } from './components/admin/admin-datasets/admin-datasets.component';
import { AdminDetailComponent } from './components/admin/admin-detail/admin-detail.component';
import { ModalTestComponent } from './components/modal-test/modal-test.component';


@NgModule({
  declarations: [
    AppComponent,
	EditPopUpComponent,
	AdminPanelComponent,
	UploadPopUpComponent,
	PageNotFoundComponent,
	AdminUsersComponent,
	AdminOrganisationsComponent,
	AdminDatasetsComponent,
	AdminDetailComponent,
	ModalTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
