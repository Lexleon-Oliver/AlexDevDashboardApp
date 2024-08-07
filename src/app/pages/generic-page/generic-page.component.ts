import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { TableComponent } from '../../components/table/table.component';
import { catchError, Observable, of, tap } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

export const BASE_SERVICE = new InjectionToken<BaseService<any>>('BaseService');

interface BaseService<T> {
  list(): Observable<T[]>;
  delete(id: any): Observable<any>;
}

@Component({
  selector: 'app-generic-page',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    ButtonComponent,
    TableComponent,
    ConfirmModalComponent,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './generic-page.component.html',
  styleUrl: './generic-page.component.scss'
})
export class GenericPageComponent<T> implements OnInit {

  @Input() pageTitle!: any;
  @Input() items$!: Observable<T[]>;
  @Input() columns!: TableColumn<T>[];
  @Input() buttonsAction: ButtonModel[] = [];
  @Input() confirmModal!: any;
  @Input() addRoute!: string;

  rounded: boolean = true;
  disabled: boolean = false;
  itemsList: T[] = [];
  itemToRemove!: T;

  constructor(
    private router: Router,
    public requestService: RequestService,
    private modalService: ModalService,
    @Inject(BASE_SERVICE) private service: BaseService<T>
  ) {}

  ngOnInit() {
    this.setItems();
    console.log("Teste Generic:",this.addRoute);

  }

  onAdd() {
    if (this.addRoute) {
      this.router.navigate([`${this.addRoute}/new`]);
    } else {
      console.error('addRoute is undefined or empty:', this.addRoute);
    }
  }

  private setItems(): void {
    this.items$ = this.service.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(item: T) {
    this.requestService.showLoading();
    this.router.navigate([`${this.addRoute}/${(item as any).id}/edit`]);
  }

  onRemove(item: T) {
    this.itemToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.itemToRemove) {
      this.service.delete((this.itemToRemove as any).id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setItems();
          this.modalService.cancelAction();
          this.itemToRemove = {} as T;
        },
        error: (err) => {
          this.modalService.cancelAction();
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
