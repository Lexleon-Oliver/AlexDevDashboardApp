import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { inject } from "@angular/core";
import { OfficialLetter } from "../models/official-letter";
import { OfficialLettersService } from "../services/official-letters.service";

const defaultObject: OfficialLetter = {
  id: 0,
  cod: '',
  title: '',
  content: "",
  sender: "",
  recipient: "",
  sentAt: "",
  receivedAt: "",
};

export const OfficialLetterResolver: ResolveFn<OfficialLetter> = createGenericResolver<OfficialLetter>(() => inject(OfficialLettersService), defaultObject);
