import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {FbUserService} from "./fb-user.service";
import {FbSessionService} from "./session/fb-session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

  constructor(private userService: FbUserService, private router: Router, private sessionService: FbSessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.userService.getLoggedInUser() == null || undefined){
      console.log("Logged in user is null");
      this.router.navigate(['**']);
      return false;
    } else if(this.userService.getLoggedInUser().isAdmin == false || undefined){
      console.log("Logged in user is no admin");
      this.router.navigate(['**']);
      return false;
    } else return true;
  }
}
