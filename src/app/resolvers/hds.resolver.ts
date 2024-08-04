import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { HdsService } from "../services/hds.service";
import { createGenericListResolver } from "./generic-list.resolver";
import { Hd } from "../models/hd";

export const HdsResolver: ResolveFn<Hd[]> = createGenericListResolver<Hd>(() => inject(HdsService));
