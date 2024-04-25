import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./authService";
// import { AuthService } from "../helper/auth";

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.$state().token) {
    const reqWithToken = req.clone({
      headers: req.headers.set(
        "Authorization",
        "Bearer " + authService.$state().token
      ),
    });
    return next(reqWithToken);
  }
  return next(req);
};
