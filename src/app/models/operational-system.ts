
export class OperationalSystem {
  id!: number;
  name!: string;
  installationDate!: string;
  serialNumber!: string;
  workgroup!: string;

  constructor(data?: Partial<OperationalSystem>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
