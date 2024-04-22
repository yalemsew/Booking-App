import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes), provideHttpClient()], //root injector
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    // provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
  ],
};
