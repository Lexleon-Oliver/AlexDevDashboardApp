import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { OperationalSystem } from '../../models/operational-system';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OperationalSystemsService } from '../../services/operational-systems.service';
import { RequestService } from '../../services/request.service';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { DatepickerFormComponent } from '../../components/datepicker-form/datepicker-form.component';
import { InputSerialNumberComponent } from '../../components/input-serial-number/input-serial-number.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { OperationalSystemsEnum } from '../../enums/operational-systems-enum';

@Component({
  selector: 'app-operational-system-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    DatepickerFormComponent,
    InputSerialNumberComponent,
    SelectFormComponent,

  ],
  templateUrl: './operational-system-form.component.html',
  styleUrl: './operational-system-form.component.scss'
})
export class OperationalSystemFormComponent {


  operationalSystem:OperationalSystem= new OperationalSystem();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private operationalSystemsService: OperationalSystemsService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      name: [OperationalSystemsEnum.WIN_10],
      installationDate:['',],
      serialNumber:['', [Validators.required, Validators.pattern(/^([A-Z0-9]{5}-){4}[A-Z0-9]{5}$/)]],
      workgroup:['WORKGROUP',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
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
    const itemData: OperationalSystem = this.route.snapshot.data['operationalSystem'];

    if (itemData.id!==0) {
      console.log(itemData);

      this.operationalSystem = new OperationalSystem(itemData);
      console.log(this.operationalSystem);
      this.form.patchValue(itemData);
      console.log(this.form);

    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.workgroup = formData.workgroup.toUpperCase();
    if(!formData.installationDate){
      formData.installationDate = "1970-01-01";

    }

    Object.assign(this.operationalSystem, formData);
    let itemData = new OperationalSystem(this.operationalSystem);
    this.operationalSystemsService.save(itemData).subscribe({
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


  get systemsOptions() {
    return this.enumToOptions(OperationalSystemsEnum);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }

}
