import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { PageLayoutNocolumnComponent } from '../../components/page-layout-nocolumn/page-layout-nocolumn.component';
import { Observable, catchError, of, tap } from 'rxjs';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { CheckboxItem } from '../../models/checkbox-item';
import { BadgeValue } from '../../models/badge-value';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { TodoListComponent } from '../../components/dashboard-page/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    PageLayoutNocolumnComponent,
    SimpleCardComponent,
    TodoListComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  tasksToDashboard : CheckboxItem[] =[ ]
  tasks$!: Observable<Task[]>;
  linkTaskDisabled: boolean = false;

  constructor(
    private tasksService:TasksService,
    public requestService: RequestService,
    private router : Router,
    ) {
    }

  ngOnInit() {
    this.setTasks();
  }

  setTasks() {
    this.tasks$ = this.tasksService.list().pipe(
      tap((items) => {
        this.tasksToDashboard = items.map((task) => ({
          id: task.id,
          value: task.description,
          label: task.description,
          expiration: task.expirationDate,
          checked: task.isCompleted,
          ariaLabel: 'Label for task '+task.description,
          group: 'group' + task.id,
          ...(this.calculateBadgeValues(task.expirationDate) as BadgeValue),
        }));
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  calculateBadgeValues(expirationDate: string): Partial<CheckboxItem> {
    const formattedExpirationDate = expirationDate.split('/').reverse().join('-');

    const currentDate = new Date();
    const currentTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    ).getTime();

    const expirationDateTime = new Date(formattedExpirationDate);
    expirationDateTime.setDate(expirationDateTime.getDate() + 1);
    const timeDifference = expirationDateTime.getTime() - currentTime;
    const oneDay = 1000 * 60 * 60 * 24;

    let tipoSelo = 'success';
    let textSelo = '';

    if (timeDifference <= 0) {
      textSelo = 'Vencido';
      tipoSelo = 'dark';
    } else if (timeDifference <= oneDay) {
      textSelo = 'Vence hoje';
      tipoSelo = 'danger';
    } else if (timeDifference <= oneDay * 2) {
      textSelo = 'Vence em 1 dia';
      tipoSelo = 'warning';
    } else if (timeDifference <= oneDay * 3) {
      textSelo = 'Vence em 2 dias';
      tipoSelo = 'warning';
    } else if (timeDifference <= oneDay * 4) {
      textSelo = 'Vence em 3 dias';
      tipoSelo = 'warning';
    } else {
      textSelo = 'Mais de 4 dias';
      tipoSelo = 'success';
    }

    return { tipoSelo, textSelo };
  }


  criarTarefa() {
    this.router.navigate(['../users/tasks/new']);
  }

  irParaTarefas() {
    this.linkTaskDisabled =true;
    this.router.navigate(['../users/tasks']);
  }
}

