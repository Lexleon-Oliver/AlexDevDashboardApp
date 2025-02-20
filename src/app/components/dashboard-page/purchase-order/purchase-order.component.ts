import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class PurchaseOrderComponent implements OnInit {

  @Input() items: PurchaseOrder[] = [];

  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseordersService,
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.filterAndSortItems();
  }

  filterAndSortItems() {
    this.items = this.items
      .filter(item => !item.received)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }


  editarOrder(id: number) {
    this.router.navigate(['/docs/purchaseorders', id, 'edit']);
  }

  onReceivedChange(item: PurchaseOrder, event: any) {
    console.log('onReceivedChange', item, event);

    item.received = event.target.checked;
    console.log('item.received', item);

    this.purchaseOrderService.save(item).subscribe({
      next: (res: any) => {
        this.requestService.trataSucesso(res);
        this.moveItemToEnd(item);
      },
      error: (error) => {
        this.requestService.trataErro(error);
      }
    });
  }

  moveItemToEnd(item: PurchaseOrder) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      this.items.push(item);
    }
  }

}
