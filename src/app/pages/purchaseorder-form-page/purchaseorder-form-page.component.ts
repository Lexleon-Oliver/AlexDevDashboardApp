import { CheckboxComponent } from './../../components/checkbox/checkbox.component';
import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { PurchaseOrder } from '../../models/purchase-order';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { PurchaseordersService } from '../../services/purchaseorders.service';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';
import { DatepickerFormComponent } from '../../components/datepicker-form/datepicker-form.component';
import { TextAreaFormComponent } from '../../components/text-area-form/text-area-form.component';

@Component({
  selector: 'app-purchaseorder-form-page',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    DatepickerFormComponent,
    TextAreaFormComponent,
    CheckboxComponent
  ],
  templateUrl: './purchaseorder-form-page.component.html',
  styleUrl: './purchaseorder-form-page.component.scss'
})
export class PurchaseOrderFormPageComponent {
  purchaseOrder:PurchaseOrder= new PurchaseOrder();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private purchaseOrdersServices: PurchaseordersService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      items:['',[Validators.required,Validators.minLength(3), Validators.maxLength(1000)]],
      vendor: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      date: ['',[Validators.required]],
      received: [false],
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
    const itemData: PurchaseOrder = this.route.snapshot.data['purchaseOrder'];

    if (itemData.id!==0) {
      this.purchaseOrder = new PurchaseOrder(itemData);
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

    Object.assign(this.purchaseOrder, formData);
    let itemData = new PurchaseOrder(this.purchaseOrder);
    this.purchaseOrdersServices.save(itemData).subscribe({
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

  onReceivedChange(event: any) {
    this.form.get('received')?.setValue(event.target.checked);
  }

}

