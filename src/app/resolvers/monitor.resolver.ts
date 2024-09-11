import { ResolveFn } from "@angular/router";
import { GraphicsConnections } from "../enums/graphics-connections";
import { createGenericResolver } from "./generic.resolver";
import { inject } from "@angular/core";
import { Monitor } from "../models/monitor";
import { MonitorsService } from "../services/monitors.service";


const defaultObject: Monitor = {
  id: 0,
  brand: '',
  model: "",
  size: '',
  graphicsConnectionsTypes: [GraphicsConnections.VGA,GraphicsConnections.HDMI],
  inUse: false,
};

export const MonitorResolver: ResolveFn<Monitor> = createGenericResolver<Monitor>(() => inject(MonitorsService), defaultObject);
