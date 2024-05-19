import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { CookieService } from "ngx-cookie-service";
import { Observable, catchError, switchMap, throwError } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const authToken = cookieService.get('jwtToken');

  // if (authToken) {
  //   const authReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${authToken}`
  //     }
  //   });

  //   return next(authReq).pipe(
  //     catchError((error) => {
  //       if (error.status === 401) {
  //         console.log("Caiu em erro 401");

  //         // Se o erro for 401 (não autorizado), tente renovar o token
  //         return authService.renewToken().pipe(
  //           switchMap((newToken: string) => {
  //             // Armazena o novo token no cookie
  //             cookieService.set('jwtToken', newToken);

  //             // Clona a requisição original com o novo token
  //             const newAuthReq = req.clone({
  //               setHeaders: {
  //                 Authorization: `Bearer ${newToken}`
  //               }
  //             });

  //             // Reenvia a requisição original com o novo token
  //             return next(newAuthReq);
  //           }),
  //           catchError((errorRenovacao) => {
  //             console.error("Erro na renovação do token", errorRenovacao);

  //             // Em caso de erro na renovação, realiza logout
  //             authService.logout();
  //             return throwError(() => errorRenovacao);
  //           })
  //         );
  //       }
  //       // Propaga outros erros
  //       return throwError(() => error);
  //     })
  //   );
  // }
  // return next(req);
  if (authToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if(error.error.status==401){
        return authService.renewToken().pipe(
          switchMap(() => {
            req = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${cookieService.get('jwtToken')}`)
            });
            return next(req);
          }),
          catchError((errorRenovacao) => {
            console.error("Erro na renovação do token")
            authService.logout();
            // Retorne algo se necessário
            return throwError(()=>errorRenovacao);
          })
        );
      }
      return throwError(()=>error);
    })
  );
};
