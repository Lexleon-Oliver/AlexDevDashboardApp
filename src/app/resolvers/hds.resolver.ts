import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { HdsService } from "../services/hds.service";

export const HdsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  hdsService: HdsService = inject(HdsService)
): Observable<{}> =>
  hdsService.listHds().pipe(
    catchError((err) => {
      return of('No data' + err);
    })
  );
