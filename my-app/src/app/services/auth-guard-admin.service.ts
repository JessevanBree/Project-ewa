import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AUserService} from "./fb-user.service";
import {FbSessionService} from "./session/fb-session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

  constructor(private aUserService: AUserService, private router: Router, private sessionService: FbSessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	let loggedInUser = null;
	this.aUserService.getLoggedInUser().then((user) => {
		loggedInUser = user
		console.log(user)
	});
    if(loggedInUser == null || undefined){
      console.log("Logged in user is null");
      this.router.navigate(['**']);
      return false;
    } else if(loggedInUser.isAdmin == false || undefined){
      console.log("Logged in user is no admin");
      this.router.navigate(['**']);
      return false;
    } else return true;
  }
}
