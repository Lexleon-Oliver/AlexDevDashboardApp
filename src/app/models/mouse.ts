import { InputConnectionType } from "../enums/input-connection-type";

export class Mouse {
  id!: number;
  model!: string;
  connectionType!: InputConnectionType.USB;
  inUse!: boolean;

  constructor(data?: Partial<Mouse>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
