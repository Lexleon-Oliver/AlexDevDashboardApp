import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { MultiSelectFormComponent } from '../../components/multi-select-form/multi-select-form.component';
import { Monitor } from '../../models/monitor';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { MonitorsService } from '../../services/monitors.service';
import { RequestService } from '../../services/request.service';
import { SizePol } from '../../enums/sizepol';
import { GraphicsConnections } from '../../enums/graphics-connections';
import { Location } from '@angular/common';

@Component({
  selector: 'app-monitor-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    SelectFormComponent,
    MultiSelectFormComponent,
  ],
  templateUrl: './monitor-form.component.html',
  styleUrl: './monitor-form.component.scss'
})
export class MonitorFormComponent {
  monitor: Monitor= new Monitor();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private monitorsService: MonitorsService,
    public requestService: RequestService,

  ){
    this.form = this.formBuilder.group({
      id: 0,
      brand: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      size: [SizePol.Size_19_Pol],
      graphicsConnectionsTypes:[GraphicsConnections.VGA],

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
    const itemData: Monitor = this.route.snapshot.data['monitor'];
    if (itemData.id!==0) {
      this.monitor = new Monitor(itemData);
      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.brand = formData.brand.toUpperCase();
    formData.model = formData.model.toUpperCase();

    Object.assign(this.monitor, formData);
    let itemData = new Monitor(this.monitor);
    this.monitorsService.save(itemData).subscribe({
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

  get graphicsConnectionsOptions() {
    return this.enumToOptions(GraphicsConnections);
  }

  get sizeOptions() {
    return this.enumToOptions(SizePol);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }
}
