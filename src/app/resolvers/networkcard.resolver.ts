import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { createGenericResolver } from "./generic.resolver";
import { NetworkCard } from "../models/networkcard";
import { NetworkcardsService } from "../services/networkcards.service";
import { TransferRate } from "../enums/transfer-rate";

const defaultObject: NetworkCard = {
  id: 0,
  brand: '',
  model: '',
  macAddress: '',
  transferRate: TransferRate.RATE_10_MBPS,
  inUse: false,
};

export const NetworkcardResolver: ResolveFn<NetworkCard> = createGenericResolver<NetworkCard>(() => inject(NetworkcardsService), defaultObject);
