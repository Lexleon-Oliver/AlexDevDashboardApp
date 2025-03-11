import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { InputNumberFormComponent } from '../../components/input-number-form/input-number-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { CartridgeToner } from '../../models/cartridge-toner';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { CartridgeTonersService } from '../../services/cartridge-toners.service';

@Component({
  selector: 'app-cartridge-toner-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    InputNumberFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './cartridge-toner-form.component.html',
  styleUrl: './cartridge-toner-form.component.scss'
})
export class CartridgeTonerFormComponent {

  toner:CartridgeToner= new CartridgeToner();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private cartridgeTonerService: CartridgeTonersService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      compatibility: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      quantity:['',[Validators.required,Validators.min(0)]],
    });
    this.formButtons.push(
      new ButtonModel('', 'bi bi-arrow-return-left', 'default', 'secondary', 'small', false, false, this.onCancel.bind(this)),
      new ButtonModel('', 'bi bi-floppy', 'default', 'success', 'small', false, true, this.onAdd.bind(this),this.form),
    );
  }

  ngOnInit() {
    if(this.requestService.isLoading){
      this.requestService.hideLoading();
    }
    const itemData: CartridgeToner = this.route.snapshot.data['cartridgeToner'];

    if (itemData.id!==0) {

      this.toner = new CartridgeToner(itemData);
      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.model = formData.model.toUpperCase();
    formData.compatibility = formData.compatibility.toUpperCase();

    Object.assign(this.toner, formData);
    let itemData = new CartridgeToner(this.toner);
    this.cartridgeTonerService.save(itemData).subscribe({
      next:(res:any)=>{
        this.requestService.hideLoading()
        this.requestService.trataSucesso(res)
        setTimeout(() => {
          this.onCancel();
        }, 3000);
      },
      error: (error)=>{
        this.requestService.hideLoading()
        this.requestService.trataErro(error );
      }
    });
  }
}
