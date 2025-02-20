import { Component, Input, OnInit } from '@angular/core';
import { CartridgeToner } from '../../../models/cartridge-toner';
import { Router } from '@angular/router';
import { BadgeItemPillComponent } from '../../badge-item-pill/badge-item-pill.component';

@Component({
  selector: 'app-cartridge-toners',
  standalone: true,
  imports: [
    BadgeItemPillComponent
  ],
  templateUrl: './cartridge-toners.component.html',
  styleUrl: './cartridge-toners.component.scss'
})
export class CartridgeTonersComponent implements OnInit {

  @Input() items: CartridgeToner[] = [];
   tipoSelo: string = "";

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.sortItemsByQuantity();
  }

  sortItemsByQuantity() {
    this.items.sort((a, b) => a.quantity - b.quantity);
  }

  editarToner(id: number) {
    this.router.navigate(['/inventory/cartridgetoners', id, 'edit']);
  }

  setTipoSelo(quantity: number): string {
    if (quantity == 0) {
      this.tipoSelo = 'dark';
    } else if (quantity == 1) {
      this.tipoSelo = 'danger';
    } else if (quantity ==  2) {
      this.tipoSelo = 'warning';
    } else if (quantity == 3) {
      this.tipoSelo = 'warning';
    } else if (quantity == 4) {
      this.tipoSelo = 'warning';
    } else {
      this.tipoSelo = 'success';
    }
    return this.tipoSelo;
  }
}
