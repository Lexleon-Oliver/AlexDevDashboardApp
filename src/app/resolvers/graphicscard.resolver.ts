import { ResolveFn } from "@angular/router";
import { GraphicsConnections } from "../enums/graphics-connections";
import { GraphicsCard } from "../models/graphics-card";
import { createGenericResolver } from "./generic.resolver";
import { inject } from "@angular/core";
import { GraphicscardsService } from "../services/graphicscards.service";


const defaultObject: GraphicsCard = {
  id: 0,
  brand: '',
  model: "",
  capacity: '',
  graphicsConnectionsTypes: [GraphicsConnections.VGA,GraphicsConnections.HDMI],
  inUse: false,
};

export const GraphicscardResolver: ResolveFn<GraphicsCard> = createGenericResolver<GraphicsCard>(() => inject(GraphicscardsService), defaultObject);
