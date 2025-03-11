import { GraphicsConnections } from "../enums/graphics-connections";

export class Monitor {
  id!: number;
  brand!: string;
  model!: string;
  size!: string;
  graphicsConnectionsTypes!: GraphicsConnections[];
  inUse!: boolean;

  constructor(data?: Partial<Monitor>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}