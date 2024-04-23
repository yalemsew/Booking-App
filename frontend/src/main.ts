import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { Routes, provideRouter, withViewTransitions } from "@angular/router";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// bootstrapApplication(AppComponent, appConfig);
// {
//   try {
//     const appRoutes: Routes = [];
//     providers: [provideRouter(appRoutes, withViewTransitions())];
//   } catch (error) {
//     console.error(error);
//   }
// }
