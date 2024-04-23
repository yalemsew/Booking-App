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
      if (allowedRoles && !allowedRoles.includes(user.usertype)) {
        this.router.navigate(["/signin"]);
        return false;
      }
      return true;
    }
    this.router.navigate(["/signin"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
