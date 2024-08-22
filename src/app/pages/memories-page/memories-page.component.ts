import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColumn } from '../../models/table-column';
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
export class MemoriesPageComponent {

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


  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
  ) {

  }

}
