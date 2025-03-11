import { ResolveFn } from "@angular/router";
import { PurchaseOrder } from "../models/purchase-order";
import { createGenericResolver } from "./generic.resolver";
import { inject } from "@angular/core";
import { PurchaseordersService } from "../services/purchaseorders.service";

const defaultObject: PurchaseOrder = {
  id: 0,
  items: '',
  vendor: "",
  date: "",
  received: false,
};

export const PurchaseOrderResolver: ResolveFn<PurchaseOrder> = createGenericResolver<PurchaseOrder>(() => inject(PurchaseordersService), defaultObject);
