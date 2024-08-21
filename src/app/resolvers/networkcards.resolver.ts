import { NetworkCard } from './../models/networkcard';
import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { createGenericListResolver } from "./generic-list.resolver";
import { NetworkcardsService } from '../services/networkcards.service';

export const NetworkcardsResolver: ResolveFn<NetworkCard[]> = createGenericListResolver<NetworkCard>(() => inject(NetworkcardsService));
