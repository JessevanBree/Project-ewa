import { Component, OnInit } from '@angular/core';
import {FbSessionService} from "../../services/session/fb-session.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-firebase-login',
  templateUrl: './firebase-login.component.html',
  styleUrls: ['./firebase-login.component.css']
})
export class FirebaseLoginComponent implements OnInit {
  private password: string;
  private email: string;
  public returnUrl: string;
  private errorMessage: string;

  constructor(private sessionService: FbSessionService, private route: ActivatedRoute, private router: Router) {

  }

  onLogin(){
    this.sessionService.signOn(this.email, this.password).then(
      () => {
        console.log(this.returnUrl);
        this.router.navigateByUrl(this.returnUrl);
      }
    ).catch(error => {
    console.log(error);
    this.errorMessage = error}
    )
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/' )
  }

}
