import { ResolveFn } from "@angular/router";
import { Task } from "../models/task";
import { createGenericResolver } from "./generic.resolver";
import { inject } from "@angular/core";
import { TasksService } from "../services/tasks.service";


const defaultObject: Task = {
  id:0,
  description: "",
  expirationDate: "",
  isCompleted: false,
  user: 0
};

export const TaskResolver: ResolveFn<Task> = createGenericResolver<Task>(() => inject(TasksService), defaultObject);
