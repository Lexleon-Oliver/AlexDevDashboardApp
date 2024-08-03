import { StorageType } from "../enums/storage-type";

export class Hd {
  id!: number;
  brand!: string;
  capacity!: string;
  type!: StorageType.HDD
  inUse!: boolean;

  constructor(data?: Partial<Hd>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
