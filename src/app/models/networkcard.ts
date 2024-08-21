
export class NetworkCard {
  id!: number;
  macAddress!:string;
  brand!: string;
  model!: string;
  transferRate!: string;
  inUse!: boolean;

  constructor(data?: Partial<NetworkCard>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
