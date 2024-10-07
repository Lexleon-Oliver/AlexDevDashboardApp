import { Case } from "./case";
import { GraphicsCard } from "./graphics-card";
import { Hd } from "./hd";
import { Keyboard } from "./keyboard";
import { Memory } from "./memory";
import { Monitor } from "./monitor";
import { Motherboard } from "./motherboard";
import { Mouse } from "./mouse";
import { NetworkCard } from "./networkcard";
import { OperationalSystem } from "./operational-system";
import { PowerSupply } from "./power-supply";
import { Processor } from "./processor";
import { Speaker } from "./speaker";

export class Computer {
  id!: number;
  name!: string;
  operatingSystem!:OperationalSystem;
  userAccounts!: any[];
  hds!:Hd[];
  memories!:Memory[];
  cpu!:Processor;
  motherboard!:Motherboard;
  computerCase!:Case;
  monitors!:Monitor[];
  keyboard!:Keyboard;
  mouse!:Mouse;
  powerSupply!:PowerSupply;
  speaker?:Speaker;
  graphicsCard?:GraphicsCard;
  networkCard?:NetworkCard;



  constructor(data?: Partial<Computer>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
