import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { Hd } from '../../models/hd';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { HdsService } from '../../services/hds.service';
import { RequestService } from '../../services/request.service';
import { StorageType } from '../../enums/storage-type';
import { Location } from '@angular/common';
import { InputNumberFormComponent } from '../../components/input-number-form/input-number-form.component';

@Component({
  selector: 'app-hd-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    InputNumberFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './hd-form.component.html',
  styleUrl: './hd-form.component.scss'
})
export class HdFormComponent {

  hd:Hd= new Hd();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private hdService: HdsService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      brand: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      capacity:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      type:[StorageType.HDD],
      inUse: [false],
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
    const hdData: Hd = this.route.snapshot.data['hd'];

    if (hdData.id!==0) {
      let capacity = this.getNumericalValueFromString(hdData.capacity);
      hdData.capacity = capacity.toString();
      this.hd = new Hd(hdData);
      this.form.patchValue(hdData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    let capacityString = formData.capacity + " GB"
    formData.capacity = capacityString;
    formData.brand = formData.brand.toUpperCase();

    Object.assign(this.hd, formData);
    let hdData = new Hd(this.hd);
    this.hdService.save(hdData).subscribe({
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

  get storageTypeOptions() {
    return this.enumToOptions(StorageType);
  }


  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }

  private getNumericalValueFromString(capacityString: string): number {
    // Remove " GB" da string e converte para número
    let numericalValue = parseFloat(capacityString.replace(' GB', ''));
    return numericalValue;
  }

}
