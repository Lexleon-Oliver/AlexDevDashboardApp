import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { CartridgeToner } from "../models/cartridge-toner";
import { CartridgeTonersService } from "../services/cartridge-toners.service";

const defaultObject: CartridgeToner = {
  id: 0,
  model: '',
  compatibility: '',
  quantity: 0,
};

export const CartridgeTonerResolver: ResolveFn<CartridgeToner> = createGenericResolver<CartridgeToner>(() => inject(CartridgeTonersService), defaultObject);
