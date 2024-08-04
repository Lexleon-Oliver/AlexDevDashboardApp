import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from "rxjs";



export function createGenericListResolver<T>(serviceFactory: () => { list: () => Observable<T[]> }): ResolveFn<T[]> {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T[]> => {
    const service = serviceFactory();

    return service.list().pipe(
      catchError((err) => {
        return of([]);
      })
    );
  };
}
