import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AUserService } from "./fb-user.service";
import { FbSessionService } from "./session/fb-session.service";

@Injectable({
	providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {
	private loggedInUserIsAdmin: boolean;

	constructor(private userService: AUserService, private router: Router) { 
		this.userService.getLoggedInUser().then(user =>
			this.loggedInUserIsAdmin = user.isAdmin
		);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (sessionStorage.key(0) == null || undefined) {
			console.log("Logged in user is null");
			this.router.navigate(['**']);
			return false;
		} else if (this.loggedInUserIsAdmin == false || undefined) {
			console.log("Logged in user is no admin");
			this.router.navigate(['**']);
			return false;
		} else return true;
	}
}
