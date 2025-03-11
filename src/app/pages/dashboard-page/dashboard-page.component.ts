import { Component, Input } from '@angular/core';
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
import { PurchaseordersService } from '../../services/purchaseorders.service';
import { PurchaseOrder } from '../../models/purchase-order';
import { PurchaseOrderComponent } from '../../components/dashboard-page/purchase-order/purchase-order.component';
import { CartridgeTonersComponent } from '../../components/dashboard-page/cartridge-toners/cartridge-toners.component';
import { CartridgeToner } from '../../models/cartridge-toner';
import { CartridgeTonersService } from '../../services/cartridge-toners.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    PageLayoutNocolumnComponent,
    SimpleCardComponent,
    TodoListComponent,
    CommonModule,
    PurchaseOrderComponent,
    CartridgeTonersComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

  tasksToDashboard : CheckboxItem[] =[ ]
  tasks$!: Observable<Task[]>;
  purchaseOrders$!: Observable<PurchaseOrder[]>;
  linkTaskDisabled: boolean = false;
  receivedProduct: boolean = false;
  purchaseOrdersToDashboard: PurchaseOrder[] = [];
  cartridgeToners$!: Observable<CartridgeToner[]>
  cartridgeTonersToDashboard: CartridgeToner[] = [];

  constructor(
    private tasksService:TasksService,
    private purchaseOrderService:PurchaseordersService,
    private cartridgeTonerService:CartridgeTonersService,
    public requestService: RequestService,
    private router : Router,
    ) {
    }

  ngOnInit() {
    this.setTasks();
    this.setPurchaseOrders();
    this.setCartridgeToners();
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

  setPurchaseOrders() {
    this.purchaseOrders$ = this.purchaseOrderService.list().pipe(
      tap((orders) => {
        this.purchaseOrdersToDashboard = orders;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  setCartridgeToners(){
    this.cartridgeToners$ = this.cartridgeTonerService.list().pipe(
      tap((cartridgeToners) => {
        this.cartridgeTonersToDashboard = cartridgeToners;
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

  irParaPedidos() {
    this.router.navigate(['../docs/purchaseorders']);
  }
  criarNovoPedido() {
    this.router.navigate(['../docs/purchaseorders/new']);
  }

  irParaToners() {
    this.router.navigate(['../inventory/cartridgetoners']);
  }
  criarNovoToner() {
    this.router.navigate(['../inventory/cartridgetoners/new']);
  }
}

