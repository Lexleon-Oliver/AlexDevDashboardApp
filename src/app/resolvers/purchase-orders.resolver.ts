import { ResolveFn } from "@angular/router";
import { PurchaseOrder } from "../models/purchase-order";
import { inject } from '@angular/core';
import { createGenericListResolver } from "./generic-list.resolver";
import { PurchaseordersService } from "../services/purchaseorders.service";

export const PurchaseOrdersResolver: ResolveFn<PurchaseOrder[]> = createGenericListResolver<PurchaseOrder>(() => inject(PurchaseordersService));
