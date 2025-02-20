import { Component, Input } from '@angular/core';
import { CartridgeToner } from '../../../models/cartridge-toner';

@Component({
  selector: 'app-cartridge-toners',
  standalone: true,
  imports: [],
  templateUrl: './cartridge-toners.component.html',
  styleUrl: './cartridge-toners.component.scss'
})
export class CartridgeTonersComponent {
  @Input() items: CartridgeToner[] = [];
}
