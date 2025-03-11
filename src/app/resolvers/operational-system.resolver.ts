import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { OperationalSystem } from "../models/operational-system";
import { OperationalSystemsService } from "../services/operational-systems.service";
import { OperationalSystemsEnum } from "../enums/operational-systems-enum";

const defaultObject: OperationalSystem = {
  id: 0,
  name: OperationalSystemsEnum.WIN_10,
  installationDate: '',
  serialNumber: '',
  workgroup: "",
};

export const OperationalSystemResolver: ResolveFn<OperationalSystem> = createGenericResolver<OperationalSystem>(() => inject(OperationalSystemsService), defaultObject);
