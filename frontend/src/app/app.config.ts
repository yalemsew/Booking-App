import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withViewTransitions } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { routes } from "./app.routes";
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import { provideClientHydration } from "@angular/platform-browser";
import { addTokenInterceptor } from "./services/token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    // withViewTransitions(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
  ],
};
