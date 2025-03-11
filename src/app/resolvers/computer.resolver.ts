import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Case } from "../models/case";
import { createGenericResolver } from "./generic.resolver";
import { Computer } from "../models/computer";
import { OperationalSystem } from "../models/operational-system";
import { ComputersService } from "../services/computers.service";
import { Hd } from "../models/hd";
import { Processor } from "../models/processor";
import { Motherboard } from "../models/motherboard";
import { Keyboard } from "../models/keyboard";
import { Mouse } from "../models/mouse";
import { PowerSupply } from "../models/power-supply";

const defaultObject: Computer = {
  id: 0,
  name: '',
  operatingSystem: new OperationalSystem(),
  userAccounts: [],
  hds: [],
  memories: [],
  cpu: new Processor(),
  motherboard: new Motherboard(),
  computerCase: new Case(),
  monitors: [],
  keyboard: new Keyboard(),
  mouse: new Mouse(),
  powerSupply: new PowerSupply(),
  speaker: undefined,
  graphicsCard: undefined,
  networkCard:undefined,

};

export const ComputerResolver: ResolveFn<Computer> = createGenericResolver<Computer>(() => inject(ComputersService), defaultObject);
