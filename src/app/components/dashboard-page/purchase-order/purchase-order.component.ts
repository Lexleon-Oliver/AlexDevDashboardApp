import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckboxItem } from '../../../models/checkbox-item';
import { Router } from '@angular/router';
import { PurchaseordersService } from '../../../services/purchaseorders.service';
import { AuthService } from '../../../services/auth.service';
import { RequestService } from '../../../services/request.service';
import { PurchaseOrder } from '../../../models/purchase-order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.scss'
})
export class PurchaseOrderComponent {
  @Input() items: PurchaseOrder[] = [];

}
