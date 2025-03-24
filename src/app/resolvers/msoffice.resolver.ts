import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { inject } from "@angular/core";
import { Msoffice } from "../models/msoffice";
import { MsofficesService } from "../services/msoffices.service";

const defaultObject: Msoffice = {
  id: 0,
  serial: '',
  title: '',
};

export const MsofficeResolver: ResolveFn<Msoffice> = createGenericResolver<Msoffice>(() => inject(MsofficesService), defaultObject);
