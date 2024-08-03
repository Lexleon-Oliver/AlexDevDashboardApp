import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Hd } from "../models/hd";
import { StorageType } from "../enums/storage-type";
import { HdsService } from "../services/hds.service";

export const HdResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  hdsService: HdsService = inject(HdsService)
): Observable<Hd> =>{
  if (route.params && route.params['id']){
    return hdsService.loadById(route.params['id']);
  }
    return of({
      id:0,
      brand: "",
      capacity: "",
      type: StorageType.HDD,
      inUse: false,
    })
  }
