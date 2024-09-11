import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { Speaker } from "../models/speaker";
import { SpeakersService } from "../services/speakers.service";

const defaultObject: Speaker = {
  id: 0,
  model: '',
  inUse: false,
};

export const SpeakerResolver: ResolveFn<Speaker> = createGenericResolver<Speaker>(() => inject(SpeakersService), defaultObject);
