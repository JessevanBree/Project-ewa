import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatasetOverviewComponent} from './components/homepage/dataset-overview/dataset-overview.component';
import {DatasetDetailComponent} from './components/homepage/dataset-detail/dataset-detail.component';
import { MyuploadsComponent } from "./components/myuploads/myuploads.component";
import {AdminPanelComponent} from './components/admin/admin-panel/admin-panel.component';
import {AdminDetailComponent} from './components/admin/admin-detail/admin-detail.component';

//Unkown pages
import {LoginComponent} from "./components/login/login.component";

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ModalTestComponent} from './components/modal-test/modal-test.component';
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [

  {path: 'homepage', component: DatasetOverviewComponent,
    children: [
      {path: ':edit', component: DatasetDetailComponent}]},
  {path: '', pathMatch: 'full', redirectTo: 'homepage'},
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [{
      path: 'edit',
      component: AdminDetailComponent
    }]
  },
  {
    path: "admin",
    component: AdminPanelComponent,
    children: [
      {
        path: "edit",
        component: AdminDetailComponent
      }
    ]
  },
  {
    path: "",
    redirectTo: "/admin",
    pathMatch: "full"
  },
  { path: "myuploads", component: MyuploadsComponent },
  { path: 'profile', component: ProfileComponent},
  {
    path: "modal",
    component: ModalTestComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}

