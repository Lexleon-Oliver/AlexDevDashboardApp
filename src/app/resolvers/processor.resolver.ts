import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { CPUType } from "../enums/cpu-type";
import { ProcessorsService } from "../services/processors.service";
import { CPUFrequency } from "../enums/cpu-frequency";
import { Processor } from "../models/processor";

export const ProcessorResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  processorsService: ProcessorsService = inject(ProcessorsService)
): Observable<Processor> =>{
  if (route.params && route.params['id']){
    return processorsService.loadById(route.params['id']);
  }
    return of({
      id:0,
      model: "",
      manufacturer: "",
      cpuType: CPUType.Intel_LGA_1151,
      frequency: CPUFrequency.FREQ_2_0_GHZ,
      inUse: false,
    })
  }
