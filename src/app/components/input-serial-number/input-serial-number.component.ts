import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-serial-number',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-serial-number.component.html',
  styleUrl: './input-serial-number.component.scss'
})
export class InputSerialNumberComponent implements OnInit{
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl | any;
  @Input() id!: string;
  @Input() errorMessages: { [key: string]: string } = {};

  constructor() { }

  ngOnInit() { }

  getClass(): { [key: string]: boolean } {
    const hasError = this.control?.invalid && this.control?.touched;
    return { 'error': hasError };
  }

  getErrorKeys(errorObject: { [key: string]: any }): string[] {
    return Object.keys(errorObject || {});
  }

  formatSerialNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    let formattedValue = '';

      for (let i = 0; i < value.length; i += 5) {
        formattedValue += value.substr(i, 5);
        if (i < value.length - 5) {
          formattedValue += '-';
        }
      }

    this.control.setValue(formattedValue);
  }


}
