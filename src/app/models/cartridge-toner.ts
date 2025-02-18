export class CartridgeToner {
  id!: number;
  model!: string;
  compatibility!: number;
  quantity!: number;

  constructor(data?: Partial<CartridgeToner>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
