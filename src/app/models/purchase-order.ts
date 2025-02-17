export class PurchaseOrder {
  id!: number;
  items!: string;
  vendor!: string;
  date!: string;
  received!: boolean;

  constructor(data?: Partial<PurchaseOrder>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
