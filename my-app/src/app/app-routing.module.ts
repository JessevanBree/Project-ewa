import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
//Adminpanel
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AdminDetailComponent } from './components/admin/admin-detail/admin-detail.component';

//Unkown pages
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {ModalTestComponent} from "./components/modal-test/modal-test.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
	{
		path: 'admin',
		component: AdminPanelComponent,
		children: [{
			path: 'edit',
			component: AdminDetailComponent
		}]
	},
	{
		path: '',
		redirectTo: '/admin',
		pathMatch: 'full'
	},
  {
    path: 'modal',
    component: ModalTestComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
