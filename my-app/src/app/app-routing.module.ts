import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DatasetOverviewComponent} from './components/homepage/dataset-overview/dataset-overview.component';
import {DatasetDetailComponent} from './components/homepage/dataset-detail/dataset-detail.component';
import {MyuploadsComponent} from './components/myuploads/myuploads.component';
import {AdminPanelComponent} from './components/admin/admin-panel/admin-panel.component';

// Unkown pages
import {LoginComponent} from './components/login/login.component';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ProfileComponent} from "./components/profile/profile.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {FirebaseLoginComponent} from "./components/firebase-login/firebase-login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthGuardAdminService} from "./services/auth-guard-admin.service";
import {EditMetadataPopupComponent} from "./components/edit-metadata-popup/edit-metadata-popup.component";
import {EditDatasetPopupComponent} from "./components/edit-dataset-popup/edit-dataset-popup.component";
import {UploadPopUpComponent} from "./components/upload-pop-up/upload-pop-up.component";

const routes: Routes = [

  {
    path: 'homepage', component: DatasetOverviewComponent,
    children: [
      {path: ':detail', component: DatasetDetailComponent}]
  },
  {path: '', pathMatch: 'full', redirectTo: 'homepage'},
  {
    path: 'admin',
    component: AdminPanelComponent, canActivate: [AuthGuardAdminService]
  },
  {
    path: 'myuploads/:email', component: MyuploadsComponent, canActivate: [AuthGuardService],
    children: [{
      path: 'uploadDataset',
      component: UploadPopUpComponent
    }, {
      path: 'editMetaData',
      component: EditMetadataPopupComponent
    },
      {
        path: 'editDataset',
        component: EditDatasetPopupComponent
      }]
  },
  {path: 'profile/:email', component: ProfileComponent, canActivate: [AuthGuardService]},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'firebase-login',
    component: FirebaseLoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

