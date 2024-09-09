import { GraphicsConnections } from "../enums/graphics-connections";

export class GraphicsCard {
  id!: number;
  brand!: string;
  model!: string;
  capacity!: string;
  graphicsConnections!: GraphicsConnections[];
  inUse!: boolean;

  constructor(data?: Partial<GraphicsCard>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
