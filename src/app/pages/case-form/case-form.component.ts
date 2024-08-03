import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { Case } from '../../models/case';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    // InputFormComponent,
    // InputNumberFormComponent,
    // SelectFormComponent,
  ],
  templateUrl: './case-form.component.html',
  styleUrl: './case-form.component.scss'
})
export class CaseFormComponent {
  case:Case= new Case();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private casesService: CasesService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      color: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      // power:['',[Validators.required,Validators.min(99), Validators.max(9999)]],
      // inputVoltage:[Voltage.VOLTS_110],
      // inUse: [false],
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
      let power = this.getNumericalValueFromString(itemData.power);
      itemData.power = power.toString();
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
    let powerString = formData.power + "w"
    formData.model = formData.model.toUpperCase();
    formData.power = powerString;

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

  private getNumericalValueFromString(capacityString: string): number {
    let numericalValue = parseFloat(capacityString.replace('w', ''));
    return numericalValue;
  }

}
