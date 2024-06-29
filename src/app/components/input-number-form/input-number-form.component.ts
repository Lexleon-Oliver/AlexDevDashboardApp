import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-number-form.component.html',
  styleUrl: './input-number-form.component.scss'
})
export class InputNumberFormComponent {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl|any;
  @Input() id!: string;
  @Input() errorMessages: { [key: string]: string } = {};
  constructor() { }

  ngOnInit() {
  }

  getClass(): { [key: string]: boolean } {
    const hasError = this.control?.invalid && this.control?.touched;
    return { 'error': hasError };

  }

  getErrorKeys(errorObject: { [key: string]: any }): string[] {
    return Object.keys(errorObject || {});
  }

}
