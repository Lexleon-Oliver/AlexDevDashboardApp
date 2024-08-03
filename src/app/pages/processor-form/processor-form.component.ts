import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { Processor } from '../../models/processor';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProcessorsService } from '../../services/processors.service';
import { RequestService } from '../../services/request.service';
import { CPUType } from '../../enums/cpu-type';
import { CPUFrequency } from '../../enums/cpu-frequency';

@Component({
  selector: 'app-processor-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './processor-form.component.html',
  styleUrl: './processor-form.component.scss'
})
export class ProcessorFormComponent implements OnInit {
  processor:Processor= new Processor();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private processorService: ProcessorsService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      manufacturer:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      cpuType:[CPUType.Intel_LGA_1151],
      frequency: [CPUFrequency.FREQ_2_0_GHZ],
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
    const processorData: Processor = this.route.snapshot.data['processor'];

    if (processorData.id!==0) {
      this.processor = new Processor(processorData);

      this.form.patchValue(processorData);
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

    Object.assign(this.processor, formData);
    let processorData = new Processor(this.processor);
    this.processorService.save(processorData).subscribe({
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

  get cpuFrequencyOptions() {
    return this.enumToOptions(CPUFrequency);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }

}
