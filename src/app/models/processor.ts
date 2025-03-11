import { CPUFrequency } from "../enums/cpu-frequency";
import { CPUType } from "../enums/cpu-type";

export class Processor {
  id!: number;
  manufacturer!: string;
  model!: string;
  frequency!: CPUFrequency;
  inUse!: boolean;
  cpuType!: CPUType;

  constructor(data?: Partial<Processor>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
