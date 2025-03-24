import { ResolveFn } from "@angular/router";
import { inject } from '@angular/core';
import { createGenericListResolver } from "./generic-list.resolver";
import { Msoffice } from "../models/msoffice";
import { MsofficesService } from "../services/msoffices.service";

export const MsofficesResolver: ResolveFn<Msoffice[]> = createGenericListResolver<Msoffice>(() => inject(MsofficesService));
