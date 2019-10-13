import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EditPopUpComponent} from './components/edit-pop-up/edit-pop-up.component';
import {UploadPopUpComponent} from './components/upload-pop-up/upload-pop-up.component';
import {AdminPanelComponent} from './components/admin/admin-panel/admin-panel.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AdminUsersComponent} from './components/admin/admin-users/admin-users.component';
import {AdminOrganisationsComponent} from './components/admin/admin-organisations/admin-organisations.component';
import {AdminDatasetsComponent} from './components/admin/admin-datasets/admin-datasets.component';
import {AdminDetailComponent} from './components/admin/admin-detail/admin-detail.component';
import {ModalTestComponent} from './components/modal-test/modal-test.component';
import {SearchDatasetsPipe} from './components/homepage/pipes/search-datasets.pipe';
import {DatasetOverviewComponent} from './components/homepage/dataset-overview/dataset-overview.component';
import {DatasetDetailComponent} from './components/homepage/dataset-detail/dataset-detail.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import { MyuploadsComponent } from './components/myuploads/myuploads.component';
import {ProfileComponent} from "./components/profile/profile.component";
import { ChartsModule } from 'ng2-charts';

// @ts-ignore
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
    ModalTestComponent,
    NavbarComponent,
    DatasetOverviewComponent,
    DatasetDetailComponent,
    SearchDatasetsPipe,
    MyuploadsComponent,
    LoginComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
