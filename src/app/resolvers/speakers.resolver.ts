import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { Speaker } from "../models/speaker";
import { SpeakersService } from "../services/speakers.service";

export const SpeakersResolver: ResolveFn<Speaker[]> = createGenericListResolver<Speaker>(() => inject(SpeakersService));
