import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { Processor } from "../models/processor";
import { createGenericListResolver } from "./generic-list.resolver";
import { ProcessorsService } from "../services/processors.service";

export const ProcessorsResolver: ResolveFn<Processor[]> = createGenericListResolver<Processor>(() => inject(ProcessorsService));
