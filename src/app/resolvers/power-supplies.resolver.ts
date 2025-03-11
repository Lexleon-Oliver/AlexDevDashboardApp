import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { PowerSupply } from "../models/power-supply";
import { createGenericListResolver } from "./generic-list.resolver";
import { PowerSuppliesService } from "../services/power-supplies.service";


export const PowerSuppliesResolver: ResolveFn<PowerSupply[]> = createGenericListResolver<PowerSupply>(() => inject(PowerSuppliesService));
