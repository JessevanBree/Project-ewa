import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {AppComponent} from './app.component';
import {UploadPopUpComponent} from './components/upload-pop-up/upload-pop-up.component';
import {AdminPanelComponent} from './components/admin/admin-panel/admin-panel.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AdminUsersComponent} from './components/admin/admin-users/admin-users.component';
import {AdminOrganisationsComponent} from './components/admin/admin-organisations/admin-organisations.component';
import {AdminDatasetsComponent} from './components/admin/admin-datasets/admin-datasets.component';
import {EditProfileComponent} from './components/profile/edit-profile/edit-profile.component';
import {SearchArrayNamePipe} from './pipes/search-array.pipe';
import {DatasetOverviewComponent} from './components/homepage/dataset-overview/dataset-overview.component';
import {DatasetDetailComponent} from './components/homepage/dataset-detail/dataset-detail.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {MyuploadsComponent} from './components/myuploads/myuploads.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RegionFiltersPipe} from './components/homepage/pipes/region-filters.pipe';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {CreateOrganisationPopupComponent} from './components/create-organisation-popup/create-organisation-popup.component';
import {EditOrganisationPopupComponent} from './components/edit-organisation-popup/edit-organisation-popup.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FirebaseLoginComponent} from './components/firebase-login/firebase-login.component';
import {FbSessionService} from "./services/session/fb-session.service";
import {AuthInterceptor} from "./auth-interceptor";
import {PapaParseGlobalConfig, PapaParseModule} from "ngx-papaparse";
import {ViewDatasetPopupComponent} from './components/view-dataset-popup/view-dataset-popup.component';
import {EditMetadataPopupComponent} from './components/edit-metadata-popup/edit-metadata-popup.component';
import {CreateUserPopupComponent} from './components/create-user-popup/create-user-popup.component';
import {EditUserPopupComponent} from './components/edit-user-popup/edit-user-popup.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminOrganisationPanelComponent } from './components/admin-organisation-panel/admin-organisation-panel.component';
import {AddMemberPopupComponent} from "./components/admin-organisation-panel/add-member-popup/add-member-popup.component";
import { CreateMemberPopupComponent } from './components/admin-organisation-panel/create-member-popup/create-member-popup.component';
import {AdminOrganisationService} from "./services/admin-organisation.service";
import {SpringSessionService} from "./services/session/spring-session.service";
import {UserFilterPipe} from "./components/admin-organisation-panel/pipes/user-filter-pipe";
import { SearchUserArrayPipe } from './pipes/search-user-array.pipe';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    UploadPopUpComponent,
    PageNotFoundComponent,
    AdminUsersComponent,
    AdminOrganisationsComponent,
    AdminDatasetsComponent,
    NavbarComponent,
    DatasetOverviewComponent,
    DatasetDetailComponent,
	SearchArrayNamePipe,
	SearchUserArrayPipe,
    MyuploadsComponent,
    LoginComponent,
    ProfileComponent,
    RegionFiltersPipe,
    ForgotPasswordComponent,
    EditProfileComponent,
    CreateOrganisationPopupComponent,
    EditOrganisationPopupComponent,
    FirebaseLoginComponent,
    ViewDatasetPopupComponent,
    EditMetadataPopupComponent,
    EditUserPopupComponent,
    CreateUserPopupComponent,
    FooterComponent,
    AddMemberPopupComponent,
    AdminOrganisationPanelComponent,
    UserFilterPipe,
    CreateMemberPopupComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    FontAwesomeModule,
    PapaParseModule,
    PdfViewerModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot()
  ],

  providers: [
    /*[FbSessionService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],*/
    [RegionFiltersPipe]

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
