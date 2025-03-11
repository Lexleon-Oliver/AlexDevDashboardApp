import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Hd } from "../models/hd";
import { StorageType } from "../enums/storage-type";
import { HdsService } from "../services/hds.service";
import { createGenericResolver } from "./generic.resolver";

const defaultObject: Hd = {
  id: 0,
  brand: '',
  capacity: '',
  type: StorageType.HDD,
  inUse: false,
};

export const HdResolver: ResolveFn<Hd> = createGenericResolver<Hd>(() => inject(HdsService), defaultObject);
