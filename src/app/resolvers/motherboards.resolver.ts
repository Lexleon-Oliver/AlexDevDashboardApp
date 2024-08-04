
import { inject } from "@angular/core";
import { MotherboardsService } from "../services/motherboards.service";
import { ResolveFn } from "@angular/router";
import { Motherboard } from "../models/motherboard";
import { createGenericListResolver } from "./generic-list.resolver";

export const MotherboardsResolver: ResolveFn<Motherboard[]> = createGenericListResolver<Motherboard>(() => inject(MotherboardsService));
