import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CasesService } from "../services/cases.service";
import { Case } from "../models/case";
import { createGenericResolver } from "./generic.resolver";

const defaultObject: Case = {
  id: 0,
  color: '',
  numberOfBays: 0,
  hasDVD: false,
  inUse: false,
};

export const CaseResolver: ResolveFn<Case> = createGenericResolver<Case>(() => inject(CasesService), defaultObject);
