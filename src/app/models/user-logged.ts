import { MyNotification } from "./my-notification";

export class UserLogged {
  id!: number;
  username!: string;
  email!: string;
  name!: string;
  company!: string;
  jobTitle!: string;
  about!: string;
  address!: string;
  city!: string;
  phone!: string;
  notifications!: MyNotification[];
  roles!: string[];
  isActive!:boolean;

  constructor(data?: Partial<UserLogged>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
