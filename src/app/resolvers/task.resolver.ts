import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { TasksService } from "../services/tasks.service";
import { Task } from "../models/task";
import { Observable, of } from "rxjs";

export const TaskResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  tasksService: TasksService = inject(TasksService)
): Observable<Task> =>{
  if (route.params && route.params['id']){
    return tasksService.loadById(route.params['id']);
  }
    return of({
      id:0,
      description: "",
      expirationDate: "",
      isCompleted: false,
      user: 0
    })
  }
