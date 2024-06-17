import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { ProcessorsService } from "../services/processors.service";

export const ProcessorsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  processorService: ProcessorsService = inject(ProcessorsService)
): Observable<{}> =>
  processorService.listProcessors().pipe(
    catchError((err) => {
      return of('No data' + err);
    })
  );
