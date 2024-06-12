import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { Observable, catchError, of, tap } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ButtonComponent,
    SimpleCardComponent,
    TableComponent,
    LoadingComponent,
    CommonModule,
    ConfirmModalComponent,
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPageComponent implements OnInit {
  rounded: boolean=true;
  disabled: boolean= false;
  tasks$!: Observable<Task[]>;
  _tasks: Task[] = []
  columns: TableColumn<Task>[] = [
    { value: 'id', label: '#' },
    { value: 'description', label: 'Descrição' },
    { value: 'expirationDate', label: 'Vencimento' },
    { value: 'isCompleted', label: 'Completo' },
  ];
  buttonsAction: ButtonModel[]=[]
  taskToRemove!:Task;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private tasksServices:TasksService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setTasks();

  }

  onAdd(){
    this.router.navigate(['/users/tasks/new']);
  }

  private setTasks():void{
    this.tasks$ = this.tasksServices.listTasks().pipe(
      tap((items) => {
        this._tasks = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(task:Task){
    this.requestService.showLoading();
    this.router.navigate(['/users/tasks', task.id, 'edit']);
  }

  onRemove(task:Task){

    this.taskToRemove = task;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.taskToRemove) {
      this.tasksServices.delete(this.taskToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setTasks();
          this.modalService.cancelAction()
          this.taskToRemove = new Task();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
