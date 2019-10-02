import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminOrganisationsComponent } from './components/admin/admin-organisations/admin-organisations.component';
import { AdminDatasetsComponent } from './components/admin/admin-datasets/admin-datasets.component';
import { AdminDetailComponent } from './components/admin/admin-detail/admin-detail.component';

@NgModule({
	declarations: [
		AppComponent,
		AdminPanelComponent,
		PageNotFoundComponent,
		AdminUsersComponent,
		AdminOrganisationsComponent,
		AdminDatasetsComponent,
		AdminDetailComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
