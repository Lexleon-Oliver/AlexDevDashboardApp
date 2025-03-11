export class Task{
  id!: number;
  description!: string;
  expirationDate!: string;
  isCompleted!: boolean;
  user!: number;

  constructor(data?: Partial<Task>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
