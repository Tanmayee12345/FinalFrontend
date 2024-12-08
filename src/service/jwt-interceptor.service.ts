import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlciBbVXNlcm5hbWU9dXNlciwgUGFzc3dvcmQ9W1BST1RFQ1RFRF0sIEVuYWJsZWQ9dHJ1ZSwgQWNjb3VudE5vbkV4cGlyZWQ9dHJ1ZSwgQ3JlZGVudGlhbHNOb25FeHBpcmVkPXRydWUsIEFjY291bnROb25Mb2NrZWQ9dHJ1ZSwgR3JhbnRlZCBBdXRob3JpdGllcz1bUk9MRV9VU0VSXV0iLCJpYXQiOjE3MzM1NzAyMjYsImV4cCI6MTczMzYwNjIyNn0.dq2_FKJEXub1Fw-SEhVnrr3c9nhJmHsZbwynT1ZSkr8"; // Retrieve the token

    if (token) {
      // Clone the request and add the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
