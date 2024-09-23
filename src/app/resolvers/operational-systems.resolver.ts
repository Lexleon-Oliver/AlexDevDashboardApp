import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { OperationalSystem } from "../models/operational-system";
import { OperationalSystemsService } from "../services/operational-systems.service";

export const OperationalSystemsResolver: ResolveFn<OperationalSystem[]> = createGenericListResolver<OperationalSystem>(() => inject(OperationalSystemsService));
