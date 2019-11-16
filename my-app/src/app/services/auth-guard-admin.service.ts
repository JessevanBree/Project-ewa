import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AUserService} from "./fb-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

  constructor(private aUserService: AUserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.aUserService.getLoggedInUser() == null || undefined){
      this.router.navigate(['**']);
      return false;
    } else if(this.aUserService.getLoggedInUser().isAdmin == false || undefined){
      this.router.navigate(['**']);
      return false;
    } else return true;
  }
}
