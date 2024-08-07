import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hd } from '../../models/hd';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { HdsService } from '../../services/hds.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-hds-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './hds-page.component.html',
  styleUrl: './hds-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: HdsService }
  ]
})
export class HdsPageComponent {
  pageTitle = {
    titulo: 'Hds',
    itemMenu: 'Estoque',
    itemSubmenu: 'Hds',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  hds$!: Observable<Hd[]>;
  columns: TableColumn<Hd>[] = [
    { value: 'id', label: '#' },
    { value: 'brand', label: 'Marca' },
    { value: 'capacity', label: 'Capacidade' },
    { value: 'type', label: 'Tipo' },
    { value: 'inUse', label: 'Em uso' }
  ];
  buttonsAction: ButtonModel[] = [];
  confirmModal = {
    id: 'removerItemTable',
    title: 'Excluir Tarefa',
    text: 'Tem certeza que deseja remover a tarefa? Após a confirmação, o registro será excluído e NÃO PODERÁ mais ser recuperado!',
    cancelText: 'Cancelar',
    cancelClass: 'secondary',
    confirmText: 'Confirmar Exclusão',
    confirmClass: 'danger'
  };
  addRoute = '/inventory/hds';
  itemsList: Hd[] = [];
  itemToRemove!: Hd;

  constructor(
    private router: Router,
    private hdsService: HdsService,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this))
    );
  }

  ngOnInit() {
    this.setHds();
  }

  private setHds(): void {
    this.hds$ = this.hdsService.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(hd: Hd) {
    this.requestService.showLoading();
    this.router.navigate([`/inventory/hds/${hd.id}/edit`]);
  }

  onRemove(hd: Hd) {
    this.itemToRemove = hd;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.itemToRemove) {
      this.hdsService.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setHds();
          this.modalService.cancelAction();
          this.itemToRemove = {} as Hd;
        },
        error: (err) => {
          this.modalService.cancelAction();
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
