import { Voltage } from "../enums/voltage";

export class PowerSupply {
  id!: number;
  model!: string;
  power!: string;
  inputVoltage!: Voltage;
  inUse!: boolean;

  constructor(data?: Partial<PowerSupply>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
