import { TransferRate } from "../enums/transfer-rate";

export class NetworkCard {
  id!: number;
  macAddress!:string;
  brand!: string;
  model!: string;
  transferRate!: TransferRate.RATE_10_MBPS;
  inUse!: boolean;

  constructor(data?: Partial<NetworkCard>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
