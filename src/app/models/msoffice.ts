export class Msoffice {
  id!: number;
  serial!: string;
  title!: string;


  constructor(data?: Partial<Msoffice>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
