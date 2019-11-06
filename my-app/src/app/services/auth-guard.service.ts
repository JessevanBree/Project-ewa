import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {FbSessionService} from "./session/fb-session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private sessionService: FbSessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.sessionService.isAuthenticated()){
      this.router.navigate(['/firebase-login'], {queryParams: {return: state.url}});
      return false;
    }
    return true;
  }
}
