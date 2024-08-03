
export class Case {
  id!: number;
  color!: string;
  numberOfBays!: number;
  hasDVD!: boolean;
  inUse!: boolean;

  constructor(data?: Partial<Case>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
