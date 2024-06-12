import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { Task } from '../../models/task';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';
import { DatepickerFormComponent } from '../../components/datepicker-form/datepicker-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    DatepickerFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent  implements OnInit {
  task:Task= new Task();
  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private authService: AuthService,
    private taskService: TasksService,
    public requestService: RequestService,
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      description: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255),]],
      expirationDate:['',[Validators.required]],
      isCompleted: [false],
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
    const taskData: Task = this.route.snapshot.data['task'];

    if (taskData.id!==0) {
      this.task = new Task(taskData);
      const expirationDateFormatted = this.formatarDataForm(taskData.expirationDate);
      taskData.expirationDate = expirationDateFormatted;

      this.form.patchValue(taskData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    let taskData = new Task(formData);
    taskData.expirationDate = this.formatarData();
    const usuarioLogado = this.authService.getUsuarioLogado()
    taskData.user=usuarioLogado?.id||0;
    this.taskService.save(taskData)
      .subscribe({
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

  formatarData(): string {
    const expirationDateValue = this.form.get('expirationDate')?.value;
    const [ano, mes, dia] = expirationDateValue.split('-');
    const formattedExpirationDate =`${dia}/${mes}/${ano}`
    return formattedExpirationDate;
  }

  formatarDataForm(data: string): string {
    const partes = data.split('/');
    const ano = partes[2];
    const mes = partes[1].padStart(2, '0');
    const dia = partes[0].padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}
