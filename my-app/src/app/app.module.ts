import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPopUpComponent } from './components/edit-pop-up/edit-pop-up.component';
import { UploadPopUpComponent } from './components/upload-pop-up/upload-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    EditPopUpComponent,
    UploadPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
