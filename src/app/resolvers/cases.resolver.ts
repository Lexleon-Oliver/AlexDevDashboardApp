import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { CasesService } from "../services/cases.service";

export const CasesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  casesService: CasesService = inject(CasesService)
): Observable<{}> =>
  casesService.listCases().pipe(
    catchError((err) => {
      return of('No data' + err);
    })
  );
