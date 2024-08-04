import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { CasesService } from "../services/cases.service";
import { Case } from "../models/case";
import { createGenericListResolver } from "./generic-list.resolver";

export const CasesResolver: ResolveFn<Case[]> = createGenericListResolver<Case>(() => inject(CasesService));
