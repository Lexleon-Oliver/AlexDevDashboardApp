import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { GraphicsCard } from '../../models/graphics-card';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GraphicscardsService } from '../../services/graphicscards.service';
import { RequestService } from '../../services/request.service';
import { GraphicsConnections } from '../../enums/graphics-connections';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { MultiSelectFormComponent } from '../../components/multi-select-form/multi-select-form.component';
import { CapacityGb } from '../../enums/capacity-gb';
@Component({
  selector: 'app-graphics-card-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    SelectFormComponent,
    MultiSelectFormComponent,
  ],
  templateUrl: './graphics-card-form.component.html',
  styleUrl: './graphics-card-form.component.scss'
})
export class GraphicsCardFormComponent {
  graphicscard: GraphicsCard= new GraphicsCard();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private graphicscardsService: GraphicscardsService,
    public requestService: RequestService,

  ){
    this.form = this.formBuilder.group({
      id: 0,
      brand: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      capacity: [CapacityGb.CAPAC_512_MB],
      graphicsConnections:[GraphicsConnections.VGA],

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
    const itemData: GraphicsCard = this.route.snapshot.data['graphicscard'];
    if (itemData.id!==0) {
      this.graphicscard = new GraphicsCard(itemData);
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

    Object.assign(this.graphicscard, formData);
    let itemData = new GraphicsCard(this.graphicscard);
    this.graphicscardsService.save(itemData).subscribe({
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

  get graphicsCapacitiesOptions() {
    return this.enumToOptions(CapacityGb);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }
}
