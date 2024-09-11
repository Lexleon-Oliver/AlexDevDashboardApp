import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { Monitor } from "../models/monitor";
import { MonitorsService } from "../services/monitors.service";

export const MonitorsResolver: ResolveFn<Monitor[]> = createGenericListResolver<Monitor>(() => inject(MonitorsService));
