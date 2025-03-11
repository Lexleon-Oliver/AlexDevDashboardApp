import { OperationalSystemsEnum } from "../enums/operational-systems-enum";

export class OperationalSystem {
  id!: number;
  name!: OperationalSystemsEnum;
  installationDate!: string;
  serialNumber!: string;
  workgroup!: string;

  constructor(data?: Partial<OperationalSystem>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
