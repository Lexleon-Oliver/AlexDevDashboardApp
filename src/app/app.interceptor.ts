import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { CookieService } from "ngx-cookie-service";
import { Observable, catchError, switchMap, throwError } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const authToken = cookieService.get('jwtToken');

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    return next(authReq).pipe(
      catchError((error) => {
        if (error.error.tipo === "Authentication Exception") {
          return authService.renewToken().pipe(
            switchMap((newToken: string) => {
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(newAuthReq);
            }),
            catchError((errorRenovacao) => {
              console.error("Erro na renovação do token");
              authService.logout();
              return throwError(() => errorRenovacao);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
  return next(req);
};
