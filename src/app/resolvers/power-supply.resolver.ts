import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { PowerSupply } from "../models/power-supply";
import { Voltage } from "../enums/voltage";
import { PowerSuppliesService } from "../services/power-supplies.service";
import { createGenericResolver } from "./generic.resolver";

const defaultObject: PowerSupply = {
  id:0,
  model: "",
  power: "",
  inputVoltage: Voltage.VOLTS_110,
  inUse: false,
};

export const PowerSupplyResolver: ResolveFn<PowerSupply> = createGenericResolver<PowerSupply>(() => inject(PowerSuppliesService), defaultObject);
