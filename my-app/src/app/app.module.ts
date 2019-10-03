import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/mainpage/navbar/navbar.component';
import { DatasetOverviewComponent } from './components/mainpage/dataset-overview/dataset-overview/dataset-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DatasetOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
