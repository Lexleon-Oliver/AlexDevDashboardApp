import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() text: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;


}
