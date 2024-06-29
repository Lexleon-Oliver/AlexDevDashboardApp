import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { MemoriesService } from "../services/memories.service";
import { Memory } from "../models/memory";
import { MemoryType } from "../enums/memory-type";
import { MemoryFrequency } from "../enums/memory-frequency";

export const MemoryResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  memoriesService: MemoriesService = inject(MemoriesService)
): Observable<Memory> =>{
  if (route.params && route.params['id']){
    return memoriesService.loadById(route.params['id']);
  }
    return of({
      id:0,
      capacity: "",
      type: MemoryType.DDR3,
      frequency: MemoryFrequency.FREQ_1333_MHZ,
      inUse: false,
    })
  }
