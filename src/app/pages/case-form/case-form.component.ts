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
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { InputNumberFormComponent } from '../../components/input-number-form/input-number-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    InputNumberFormComponent,
    SelectFormComponent,
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
      numberOfBays:['',[Validators.required,Validators.min(0), Validators.max(10)]],
      hasDVD:[false],
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
    const itemData: Case = this.route.snapshot.data['case'];

    if (itemData.id!==0) {

      this.case = new Case(itemData);
      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;

    Object.assign(this.case, formData);
    let itemData = new Case(this.case);
    this.casesService.save(itemData).subscribe({
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
}
