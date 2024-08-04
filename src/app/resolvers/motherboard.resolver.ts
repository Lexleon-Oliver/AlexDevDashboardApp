import { inject, model } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Motherboard } from "../models/motherboard";
import { CPUType } from "../enums/cpu-type";
import { MemoryType } from "../enums/memory-type";
import { MotherboardsService } from "../services/motherboards.service";
import { createGenericResolver } from "./generic.resolver";

const defaultObject: Motherboard = {
  id:0,
  model: "",
  manufacturer: "",
  cpuType: CPUType.Intel_LGA_1151,
  memoryType: MemoryType.DDR3,
  inUse: false,
};

export const MotherboardResolver: ResolveFn<Motherboard> = createGenericResolver<Motherboard>(() => inject(MotherboardsService), defaultObject);
