import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { CartridgeToner } from "../models/cartridge-toner";
import { CartridgeTonersService } from "../services/cartridge-toners.service";

export const CartridgeTonersResolver: ResolveFn<CartridgeToner[]> = createGenericListResolver<CartridgeToner>(() => inject(CartridgeTonersService));
