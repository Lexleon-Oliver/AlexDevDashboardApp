
export class Case {
  id!: number;
  color!: string;
  numberOfBays!: number;
  hasDvd!: boolean;
  inUse!: boolean;

  constructor(data?: Partial<Case>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
