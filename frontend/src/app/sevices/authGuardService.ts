import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./authService";

@Injectable({ providedIn: "root" })
export class AuthGuardService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { roles: allowedRoles } = route.data;
    if (allowedRoles?.length && allowedRoles[0] == "") {
      return true;
    }
    const user = this.authService.$state();

    if (user) {
      // check if route is restricted by role

      if (allowedRoles && !allowedRoles.includes(user.usertype)) {
        // role not authorized so redirect to home page
        this.router.navigate(["/signin"]);
        return false;
      }
      // authorized so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(["/signin"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
