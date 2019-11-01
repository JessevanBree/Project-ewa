import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Urban Analytics';

  ngOnInit() {
   let firebaseConfig = {
      apiKey: "api-key",
      authDomain: "project-id.firebaseapp.com",
      databaseURL: "https://project-id.firebaseio.com",
      projectId: "project-id",
      storageBucket: "project-id.appspot.com",
      messagingSenderId: "sender-id",
      appId: "app-id",
      measurementId: "G-measurement-id",
    };

  }


}
