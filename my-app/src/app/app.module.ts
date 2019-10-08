import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './Aris/profile/profile.component';
import { NavBarComponent } from './Aris/nav-bar-Aris/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
