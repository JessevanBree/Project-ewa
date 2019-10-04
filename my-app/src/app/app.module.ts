import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/mainpage/navbar/navbar.component';
import { DatasetOverviewComponent } from './components/mainpage/dataset-overview/dataset-overview.component';
import { DatasetDetailComponent } from './components/mainpage/dataset-detail/dataset-detail.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DatasetOverviewComponent,
    DatasetDetailComponent
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
