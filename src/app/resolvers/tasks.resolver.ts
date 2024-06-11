import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TasksService } from "../services/tasks.service";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

export const TasksResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  taskService: TasksService = inject(TasksService)
): Observable<{}> =>
  taskService.listTasks().pipe(
    catchError((err) => {
      return of('No data' + err);
    })
  );
