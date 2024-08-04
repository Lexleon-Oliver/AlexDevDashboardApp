import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { InputNumberFormComponent } from '../../components/input-number-form/input-number-form.component';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { Mouse } from '../../models/mouse';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { MousesService } from '../../services/mouses.service';
import { InputConnectionType } from '../../enums/input-connection-type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mouse-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    InputNumberFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './mouse-form.component.html',
  styleUrl: './mouse-form.component.scss'
})
export class MouseFormComponent {
  mouse:Mouse= new Mouse();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private mousesService: MousesService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      connectionType:[InputConnectionType.USB],
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
    const itemData: Mouse = this.route.snapshot.data['mouse'];

    if (itemData.id!==0) {
      this.mouse = new Mouse(itemData);
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

    Object.assign(this.mouse, formData);
    let itemData = new Mouse(this.mouse);
    this.mousesService.save(itemData).subscribe({
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

  get inputConnectionsOptions() {
    return this.enumToOptions(InputConnectionType);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }

}
