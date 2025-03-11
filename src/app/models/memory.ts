import { MemoryFrequency } from "../enums/memory-frequency";
import { MemoryType } from "../enums/memory-type";

export class Memory {
  id!: number;
  capacity!: string;
  type!: MemoryType;
  frequency!: MemoryFrequency;
  inUse!: boolean;

  constructor(data?: Partial<Memory>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
