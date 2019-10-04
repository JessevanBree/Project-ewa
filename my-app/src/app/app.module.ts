import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {SearchDatasetsPipe} from "./components/homepage/pipes/search-datasets.pipe";
import {DatasetOverviewComponent} from "./components/homepage/dataset-overview/dataset-overview.component";
import {DatasetDetailComponent} from "./components/homepage/dataset-detail/dataset-detail.component";
import {NavbarComponent} from "./components/homepage/navbar/navbar.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DatasetOverviewComponent,
    DatasetDetailComponent,
    SearchDatasetsPipe
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
