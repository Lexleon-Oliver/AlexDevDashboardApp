import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { Keyboard } from "../models/keyboard";
import { InputConnectionType } from "../enums/input-connection-type";
import { KeyboardsService } from "../services/keyboards.service";

const defaultObject: Keyboard = {
  id: 0,
  model: '',
  connectionType: InputConnectionType.USB,
  inUse: false,
};

export const KeyboardResolver: ResolveFn<Keyboard> = createGenericResolver<Keyboard>(() => inject(KeyboardsService), defaultObject);
