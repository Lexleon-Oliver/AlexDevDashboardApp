import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { PowerSupply } from '../../models/power-supply';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PowerSuppliesService } from '../../services/power-supplies.service';
import { RequestService } from '../../services/request.service';
import { Voltage } from '../../enums/voltage';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { InputNumberFormComponent } from '../../components/input-number-form/input-number-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';

@Component({
  selector: 'app-power-supply-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    InputNumberFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './power-supply-form.component.html',
  styleUrl: './power-supply-form.component.scss'
})
export class PowerSupplyFormComponent {

  powerSupply:PowerSupply= new PowerSupply();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private powerSupplyService: PowerSuppliesService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      power:['',[Validators.required,Validators.min(99), Validators.max(9999)]],
      inputVoltage:[Voltage.VOLTS_110],
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
    const itemData: PowerSupply = this.route.snapshot.data['powerSupply'];

    if (itemData.id!==0) {
      this.powerSupply = new PowerSupply(itemData);

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

    Object.assign(this.powerSupply, formData);
    let itemData = new PowerSupply(this.powerSupply);
    this.powerSupplyService.save(itemData).subscribe({
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
    console.log(itemData);

  }

  get voltageOptions() {
    return this.enumToOptions(Voltage);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }
}
