import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { Computer } from '../models/computer';
import { ComputersService } from "../services/computers.service";

export const ComputersResolver: ResolveFn<Computer[]> = createGenericListResolver<Computer>(() => inject(ComputersService));
