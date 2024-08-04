import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { InputConnectionType } from "../enums/input-connection-type";
import { Mouse } from "../models/mouse";
import { MousesService } from "../services/mouses.service";

const defaultObject: Mouse = {
  id: 0,
  model: '',
  connectionType: InputConnectionType.USB,
  inUse: false,
};

export const MouseResolver: ResolveFn<Mouse> = createGenericResolver<Mouse>(() => inject(MousesService), defaultObject);
