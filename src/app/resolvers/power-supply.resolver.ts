import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { PowerSupply } from "../models/power-supply";
import { Voltage } from "../enums/voltage";
import { PowerSuppliesService } from "../services/power-supplies.service";

export const PowerSupplyResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  powerSuppliesService: PowerSuppliesService = inject(PowerSuppliesService)
): Observable<PowerSupply> =>{
  if (route.params && route.params['id']){
    return powerSuppliesService.loadById(route.params['id']);
  }
    return of({
      id:0,
      model: "",
      power: "",
      inputVoltage: Voltage.VOLTS_110,
      inUse: false,
    })
  }
