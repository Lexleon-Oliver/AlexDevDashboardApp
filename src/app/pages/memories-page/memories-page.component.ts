import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, tap } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { Memory } from '../../models/memory';
import { MemoriesService } from '../../services/memories.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-memories-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './memories-page.component.html',
  styleUrl: './memories-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: MemoriesService }
  ]
})
export class MemoriesPageComponent implements OnInit{

  pageTitle = {
    titulo: 'Memórias',
    itemMenu: 'Estoque',
    itemSubmenu: 'Memórias',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };
  memories$!: Observable<Memory[]>;
  columns: TableColumn<Memory>[] = [
    { value: 'id', label: '#' },
    { value: 'capacity', label: 'Capacidade' },
    { value: 'type', label: 'Tipo' },
    { value: 'frequency', label: 'Velocidade' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  confirmModal = {
    id: 'removerItemTable',
    title: 'Excluir Tarefa',
    text: 'Tem certeza que deseja remover a tarefa? Após a confirmação, o registro será excluído e NÃO PODERÁ mais ser recuperado!',
    cancelText: 'Cancelar',
    cancelClass: 'secondary',
    confirmText: 'Confirmar Exclusão',
    confirmClass: 'danger'
  };
  addRoute = '/inventory/memories';
  itemsList: Memory[] = [];
  itemToRemove!: Memory;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private memoriesServices:MemoriesService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setMemories();

  }

  private setMemories():void{
    this.memories$ = this.memoriesServices.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(memoryItem: Memory) {
    this.requestService.showLoading();
    this.router.navigate([`/inventory/memories/${memoryItem.id}/edit`]);
  }

  onRemove(memoryItem: Memory) {
    this.itemToRemove = memoryItem;
    this.modalService.openModal('removerItemTable');
  }


  executarRemocao() {
    if (this.itemToRemove) {
      this.memoriesServices.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setMemories();
          this.modalService.cancelAction();
          this.itemToRemove = {} as Memory;
        },
        error: (err) => {
          this.modalService.cancelAction();
          this.requestService.trataErro(err);
        }
      });
    }
  }

}
