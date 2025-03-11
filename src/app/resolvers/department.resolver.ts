import { Department } from './../models/department';
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { DepartmentsService } from '../services/departments.service';

const defaultObject: Department = {
  id: 0,
  name: '',
};

export const DepartmentResolver: ResolveFn<Department> = createGenericResolver<Department>(() => inject(DepartmentsService), defaultObject);
