import { ResolveFn } from "@angular/router";
import { inject } from '@angular/core';
import { createGenericListResolver } from "./generic-list.resolver";
import { OfficialLetter } from "../models/official-letter";
import { OfficialLettersService } from "../services/official-letters.service";

export const OfficialLettersResolver: ResolveFn<OfficialLetter[]> = createGenericListResolver<OfficialLetter>(() => inject(OfficialLettersService));
