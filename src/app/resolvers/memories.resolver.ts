import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { ProcessorsService } from "../services/processors.service";
import { MemoriesService } from "../services/memories.service";

export const MemoriesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  memoryService: MemoriesService = inject(MemoriesService)
): Observable<{}> =>
  memoryService.listMemories().pipe(
    catchError((err) => {
      return of('No data' + err);
    })
  );
