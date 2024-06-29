import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { Memory } from '../../models/memory';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MemoriesService } from '../../services/memories.service';
import { RequestService } from '../../services/request.service';
import { MemoryType } from '../../enums/memory-type';
import { MemoryFrequency } from '../../enums/memory-frequency';
import { InputNumberFormComponent } from '../../components/input-number-form/input-number-form.component';

@Component({
  selector: 'app-memory-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputNumberFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './memory-form.component.html',
  styleUrl: './memory-form.component.scss'
})
export class MemoryFormComponent {

  memory:Memory= new Memory();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private memoryService: MemoriesService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      capacity: ['',[Validators.required,Validators.min(100), Validators.max(99999)]],
      type:[MemoryType.DDR3],
      frequency: [MemoryFrequency.FREQ_1333_MHZ],
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
    const memoryData: Memory = this.route.snapshot.data['memory'];

    if (memoryData.id!==0) {
      let capacity = this.convertGbToMb(this.getNumericalValueFromString(memoryData.capacity));
      memoryData.capacity = capacity.toString();
      this.memory = new Memory(memoryData);
      this.form.patchValue(memoryData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    let capacityString = this.convertMbToGb(formData.capacity) + " GB"
    formData.capacity = capacityString;

    Object.assign(this.memory, formData);
    let memoryData = new Memory(this.memory);
    this.memoryService.save(memoryData).subscribe({
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

  get memoryTypeOptions() {
    return this.enumToOptions(MemoryType);
  }

  get memoryFrequencyOptions() {
    return this.enumToOptions(MemoryFrequency);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }

  private convertMbToGb(mb: number): number {
    const gb = mb / 1000;
    return Math.round(gb * 100) / 100; // Arredonda para 2 casas decimais
  }

  private convertGbToMb(gb: number): number {
    const mb = gb * 1000;
    return Math.round(mb * 100) / 100; // Arredonda para 2 casas decimais
  }


  private getNumericalValueFromString(capacityString: string): number {
    // Remove " GB" da string e converte para número
    let numericalValue = parseFloat(capacityString.replace(' GB', ''));
    return numericalValue;
  }
}
