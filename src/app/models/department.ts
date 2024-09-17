
export class Department {
  id!: number;
  name!: string;

  constructor(data?: Partial<Department>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
