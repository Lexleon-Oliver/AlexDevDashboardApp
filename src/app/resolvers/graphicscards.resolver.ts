import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { GraphicsCard } from "../models/graphics-card";
import { GraphicscardsService } from "../services/graphicscards.service";

export const GraphicscardsResolver: ResolveFn<GraphicsCard[]> = createGenericListResolver<GraphicsCard>(() => inject(GraphicscardsService));
