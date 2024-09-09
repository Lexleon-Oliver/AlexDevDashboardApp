import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './multi-select-form.component.html',
  styleUrl: './multi-select-form.component.scss'
})
export class MultiSelectFormComponent implements OnInit {

  @Input() control!: FormControl|any;
  @Input() options: any[] = []; // Recebe as opções como entrada
  @Input() label: string = '';
  @Input() id: string = '';

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

  isSelected(option: any): boolean {
    return this.control?.value.includes(option.value);
  }

}
