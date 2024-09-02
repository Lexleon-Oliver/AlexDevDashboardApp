import { PageLayoutComponent } from './../../components/page-layout/page-layout.component';
import { Component, OnInit } from '@angular/core';
import { Motherboard } from '../../models/motherboard';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { CPUType } from '../../enums/cpu-type';
import { MemoryType } from '../../enums/memory-type';
import { MotherboardsService } from '../../services/motherboards.service';
import { MacInputFormComponent } from '../../components/mac-input-form/mac-input-form.component';

@Component({
  selector: 'app-motherboard-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    SelectFormComponent,
    MacInputFormComponent,
  ],
  templateUrl: './motherboard-form.component.html',
  styleUrl: './motherboard-form.component.scss'
})
export class MotherboardFormComponent implements OnInit {
  motherboard:Motherboard= new Motherboard();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private motherboardService: MotherboardsService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      manufacturer:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      memoryType:[MemoryType.DDR3],
      cpuType:[CPUType.Intel_LGA_1151],
      macAddress: ['',[  Validators.required,Validators.pattern(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/)]],
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
    const motherboardData: Motherboard = this.route.snapshot.data['motherboard'];

    if (motherboardData.id!==0) {
      this.motherboard = new Motherboard(motherboardData);

      this.form.patchValue(motherboardData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.model = formData.model.toUpperCase();
    formData.manufacturer = formData.manufacturer.toUpperCase();

    Object.assign(this.motherboard, formData);
    let motherboardData = new Motherboard(this.motherboard);
    this.motherboardService.save(motherboardData).subscribe({
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

  get cpuTypeOptions() {
    return this.enumToOptions(CPUType);
  }

  get memoryTypeOptions() {
    return this.enumToOptions(MemoryType);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }

}
