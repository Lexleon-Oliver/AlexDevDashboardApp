import { inject, model } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Motherboard } from "../models/motherboard";
import { CPUType } from "../enums/cpu-type";
import { MemoryType } from "../enums/memory-type";
import { MotherboardsService } from "../services/motherboards.service";

export const MotherboardResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  motherboardsService: MotherboardsService = inject(MotherboardsService)
): Observable<Motherboard> =>{
  if (route.params && route.params['id']){
    return motherboardsService.loadById(route.params['id']);
  }
    return of({
      id:0,
      model: "",
      manufacturer: "",
      cpuType: CPUType.Intel_LGA_1151,
      memoryType: MemoryType.DDR3,
      inUse: false,
    })
  }
