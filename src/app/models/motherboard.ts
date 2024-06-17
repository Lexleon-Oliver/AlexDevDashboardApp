import { CPUType } from "../enums/cpu-type";
import { MemoryType } from "../enums/memory-type";

export class Motherboard {
  id!: number;
  manufacturer!: string;
  model!: string;
  inUse!: boolean;
  memoryType!: MemoryType;
  cpuType!: CPUType;

  constructor(data?: Partial<Motherboard>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
