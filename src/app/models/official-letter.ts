export class OfficialLetter {
  id!: number;
  cod!: string;
  title!: string;
  content!: string;
  sender!: string;
  recipient!: string;
  sentAt!: string;
  receivedAt!: string;

  constructor(data?: Partial<OfficialLetter>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
