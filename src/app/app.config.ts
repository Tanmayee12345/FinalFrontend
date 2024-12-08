import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS ,withInterceptorsFromDi} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptorService } from '../service/jwt-interceptor.service'; // Update path to your service

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS, // Register the JWT Interceptor
      useClass: JwtInterceptorService,
      multi: true, // Allow multiple interceptors
    },
  ],


};
