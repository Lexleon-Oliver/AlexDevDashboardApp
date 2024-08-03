import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { CasesService } from "../services/cases.service";
import { Case } from "../models/case";

export const CaseResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  casesService: CasesService = inject(CasesService)
): Observable<Case> =>{
  if (route.params && route.params['id']){
    return casesService.loadById(route.params['id']);
  }
    return of({
      id:0,
      color: "",
      numberOfBays: 0,
      hasDvd: false,
      inUse: false,
    })
  }
