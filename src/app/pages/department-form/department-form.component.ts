import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { Department } from '../../models/department';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DepartmentsService } from '../../services/departments.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
  ],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.scss'
})
export class DepartmentFormComponent {

  department:Department= new Department();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private departmentsService: DepartmentsService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      name: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
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
    const itemData: Department = this.route.snapshot.data['department'];

    if (itemData.id!==0) {

      this.department = new Department(itemData);
      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.name = formData.name.toUpperCase();

    Object.assign(this.department, formData);
    let itemData = new Department(this.department);
    this.departmentsService.save(itemData).subscribe({
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
