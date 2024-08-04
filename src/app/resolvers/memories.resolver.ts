import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { ProcessorsService } from "../services/processors.service";
import { MemoriesService } from "../services/memories.service";
import { Memory } from "../models/memory";
import { createGenericListResolver } from "./generic-list.resolver";

export const MemoriesResolver: ResolveFn<Memory[]> = createGenericListResolver<Memory>(() => inject(MemoriesService));
