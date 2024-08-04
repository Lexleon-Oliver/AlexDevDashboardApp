import { InputConnectionType } from "../enums/input-connection-type";

export class Keyboard {
  id!: number;
  model!: string;
  connectionType!: InputConnectionType.USB;
  inUse!: boolean;

  constructor(data?: Partial<Keyboard>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
