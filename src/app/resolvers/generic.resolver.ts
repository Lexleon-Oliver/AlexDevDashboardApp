import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

export function createGenericResolver<T>(serviceFactory: () => { loadById: (id: number) => Observable<T> }, defaultObject: T): ResolveFn<T> {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> => {
    const service = serviceFactory();

    if (route.params && route.params['id']) {
      return service.loadById(route.params['id']);
    }
    return of(defaultObject);
  };
}
