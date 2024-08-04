import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { Mouse } from "../models/mouse";
import { MousesService } from "../services/mouses.service";


export const MousesResolver: ResolveFn<Mouse[]> = createGenericListResolver<Mouse>(() => inject(MousesService));
