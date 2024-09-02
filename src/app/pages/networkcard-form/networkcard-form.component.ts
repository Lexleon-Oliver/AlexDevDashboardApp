import { NetworkCard } from './../../models/networkcard';
import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { NetworkcardsService } from '../../services/networkcards.service';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';
import { MacInputFormComponent } from '../../components/mac-input-form/mac-input-form.component';
import { TransferRate } from '../../enums/transfer-rate';

@Component({
  selector: 'app-networkcard-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    SelectFormComponent,
    MacInputFormComponent,
  ],
  templateUrl: './networkcard-form.component.html',
  styleUrl: './networkcard-form.component.scss'
})
export class NetworkcardFormComponent implements OnInit{

  networkcard:NetworkCard= new NetworkCard();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private networkcardsService: NetworkcardsService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      macAddress: ['',[  Validators.required,Validators.pattern(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/)]],
      brand:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      model:['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      transferRate:[TransferRate.RATE_10_MBPS],
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
    const networkcardData: NetworkCard= this.route.snapshot.data['networkcard'];

    if (networkcardData.id!==0) {
      this.networkcard = new NetworkCard(networkcardData);
      this.form.patchValue(networkcardData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.model = formData.model.toUpperCase();
    formData.brand = formData.brand.toUpperCase();

    Object.assign(this.networkcard, formData);
    let networkcardData = new NetworkCard(this.networkcard);
    this.networkcardsService.save(networkcardData).subscribe({
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

  get transferRateOptions() {
    return this.enumToOptions(TransferRate);
  }

  private enumToOptions(enumType: any): { value: string, label: string }[] {
    return Object.keys(enumType).map(key => ({
      value: enumType[key],
      label: enumType[key]
    }));
  }

}
