import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { ProcessorsService } from "../services/processors.service";
import { PowerSuppliesService } from "../services/power-supplies.service";

export const PowerSuppliesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  powersupplyService: PowerSuppliesService = inject(PowerSuppliesService)
): Observable<{}> =>
  powersupplyService.listPowerSupplies().pipe(
    catchError((err) => {
      return of('No data' + err);
    })
  );
