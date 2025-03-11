import { GraphicsConnections } from "../enums/graphics-connections";

export class Speaker {
  id!: number;
  model!: string;
  inUse!: boolean;

  constructor(data?: Partial<Speaker>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
