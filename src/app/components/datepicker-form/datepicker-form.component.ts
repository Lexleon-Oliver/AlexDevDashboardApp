import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './datepicker-form.component.html',
  styleUrl: './datepicker-form.component.scss'
})
export class DatepickerFormComponent implements OnInit {
  @Input() control!: FormControl|any;
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() placeholder: string = '';
  @Input() id!: string;
  @Input() label: string = '';
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
