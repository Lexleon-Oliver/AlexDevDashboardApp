import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TasksService } from "../services/tasks.service";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { MotherboardsService } from "../services/motherboards.service";

export const MotherboardsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  motherboardService: MotherboardsService = inject(MotherboardsService)
): Observable<{}> =>
  motherboardService.listMotherboards().pipe(
    catchError((err) => {
      return of('No data' + err);
    })
  );
