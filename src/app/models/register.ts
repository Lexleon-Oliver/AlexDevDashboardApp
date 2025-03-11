
export class Register {
  username!: string;
  email!: string;
  name!: string;
  jobTitle!:string;
  roles!: string[];

  constructor(data?: Partial<Register>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
