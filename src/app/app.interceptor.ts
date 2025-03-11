import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { CookieService } from "ngx-cookie-service";
import { Observable, catchError, switchMap, throwError } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const authToken = cookieService.get('jwtToken');

  let modifiedReq = req;

  if (authToken) {
      modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
  }

  return next(modifiedReq).pipe(
    catchError((error) => {

      if(error.error.tipo=="Authentication Exception"){
        return authService.renewToken().pipe(
          switchMap(() => {
            const newAuthToken = cookieService.get('jwtToken');
            const renewedReq = modifiedReq.clone({
              headers: modifiedReq.headers.set('Authorization', `Bearer ${newAuthToken}`)
            });
            return next(renewedReq);
          }),
          catchError((renewError) => {
            authService.logout();
            // Retorne algo se necessário
            return throwError(() => renewError);
          })
        );
      }
      return throwError(()=>error);
    })
  );
};
