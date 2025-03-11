import { ResolveFn } from "@angular/router";
import { Observable } from "rxjs";
import { Task } from "../models/task";
import { createGenericListResolver } from "./generic-list.resolver";
import { inject } from "@angular/core";
import { TasksService } from "../services/tasks.service";

export const TasksResolver: ResolveFn<Task[]> = createGenericListResolver<Task>(() => inject(TasksService));
