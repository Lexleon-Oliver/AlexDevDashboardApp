import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { MemoriesService } from "../services/memories.service";
import { Memory } from "../models/memory";
import { MemoryType } from "../enums/memory-type";
import { MemoryFrequency } from "../enums/memory-frequency";
import { createGenericResolver } from "./generic.resolver";


  const defaultObject: Memory = {
    id:0,
    capacity: "",
    type: MemoryType.DDR3,
    frequency: MemoryFrequency.FREQ_1333_MHZ,
    inUse: false,
  };

  export const MemoryResolver: ResolveFn<Memory> = createGenericResolver<Memory>(() => inject(MemoriesService), defaultObject);
