import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CPUType } from "../enums/cpu-type";
import { ProcessorsService } from "../services/processors.service";
import { CPUFrequency } from "../enums/cpu-frequency";
import { Processor } from "../models/processor";
import { createGenericResolver } from "./generic.resolver";


const defaultObject: Processor = {
  id:0,
  model: "",
  manufacturer: "",
  cpuType: CPUType.Intel_LGA_1151,
  frequency: CPUFrequency.FREQ_2_0_GHZ,
  inUse: false,
};

export const ProcessorResolver: ResolveFn<Processor> = createGenericResolver<Processor>(() => inject(ProcessorsService), defaultObject);
