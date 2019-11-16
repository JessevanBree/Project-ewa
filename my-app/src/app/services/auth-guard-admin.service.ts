import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {FbUserService} from "./fb-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

  constructor(private userService: FbUserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.userService.getLoggedInUser() == null || undefined){
      this.router.navigate(['**']);
      return false;
    } else if(this.userService.getLoggedInUser().isAdmin == false || undefined){
      this.router.navigate(['**']);
      return false;
    } else return true;
  }
}
