import { Component, Input } from '@angular/core';
import { ButtonModel } from '../../models/button-model';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() buttons: ButtonModel[]= [];
  constructor() { }

  ngOnInit() {
    this.buttons.forEach(element => {

    });
  }


}
