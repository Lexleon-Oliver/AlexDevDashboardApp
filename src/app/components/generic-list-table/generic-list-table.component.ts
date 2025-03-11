import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { SimpleCardComponent } from '../simple-card/simple-card.component';
import { TableComponent } from '../table/table.component';
import { TableColumn } from '../../models/table-column';
import { catchError, Observable, of, tap } from 'rxjs';
import { ButtonModel } from '../../models/button-model';
import { RequestService } from '../../services/request.service';
import { BaseService } from '../../pages/generic-page/generic-page.component';

@Component({
  selector: 'app-generic-list-table',
  standalone: true,
  imports: [
    SimpleCardComponent,
    TableComponent,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './generic-list-table.component.html',
  styleUrl: './generic-list-table.component.scss'
})
export class GenericListTableComponent <T> implements OnInit {

  @Input() title!: string;
  @Input() columns!: TableColumn<T>[];
  @Input() service!: BaseService<T>;
  @Input() searchFor?: string;
  @Input() searchIn?: string;
  @Output() itemSelected = new EventEmitter<Map<string, any>>();

  componentMap: Map<string, any> = new Map();
  items$!: Observable<T[]>;
  rounded: boolean = true;
  disabled: boolean = false;
  itemsList: T[] = [];
  buttonsAction: ButtonModel[] = [];


  constructor(
    public requestService: RequestService,
  ) {}

  ngOnInit() {
    this.setItems();
    this.buttonsAction = [
      new ButtonModel('', 'bi bi-check2', 'default', 'success', 'small', false, false, this.onSelect.bind(this))
    ];

  }

  onAdd() {

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

  onSelect(item:T){
    this.componentMap.set(this.title, item);
    this.itemSelected.emit(this.componentMap);
  }

}

