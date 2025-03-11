import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge-item-pill',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './badge-item-pill.component.html',
  styleUrl: './badge-item-pill.component.scss'
})
export class BadgeItemPillComponent {

  @Input() tipoSelo: string =''
  @Input() text: string =''

  constructor() { }

  ngOnInit() {
  }
}
