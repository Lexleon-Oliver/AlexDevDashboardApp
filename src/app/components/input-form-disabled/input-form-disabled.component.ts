import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-form-disabled',
  standalone: true,
  imports: [],
  templateUrl: './input-form-disabled.component.html',
  styleUrl: './input-form-disabled.component.scss'
})
export class InputFormDisabledComponent {
  @Input() value!: string;

}
