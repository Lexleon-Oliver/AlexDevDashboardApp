import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { Department } from "../models/department";
import { DepartmentsService } from "../services/departments.service";

export const DepartmentsResolver: ResolveFn<Department[]> = createGenericListResolver<Department>(() => inject(DepartmentsService));
