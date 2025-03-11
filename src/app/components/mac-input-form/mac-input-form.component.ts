import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mac-input-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './mac-input-form.component.html',
  styleUrl: './mac-input-form.component.scss'
})
export class MacInputFormComponent implements OnInit {
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

  formatMacAddress(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
    let formattedValue = '';

    for (let i = 0; i < value.length; i += 2) {
      formattedValue += value.substr(i, 2);
      if (i < value.length - 2) {
        formattedValue += ':';
      }
    }

    this.control.setValue(formattedValue);
  }
}
