import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './text-area-form.component.html',
  styleUrl: './text-area-form.component.scss'
})
export class TextAreaFormComponent implements OnInit {
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
