import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { Keyboard } from "../models/keyboard";
import { KeyboardsService } from "../services/keyboards.service";

export const KeyboardsResolver: ResolveFn<Keyboard[]> = createGenericListResolver<Keyboard>(() => inject(KeyboardsService));
