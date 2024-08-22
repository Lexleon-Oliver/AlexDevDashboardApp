import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Keyboard } from '../../models/keyboard';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { RequestService } from '../../services/request.service';
import { KeyboardsService } from '../../services/keyboards.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-keyboards-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './keyboards-page.component.html',
  styleUrl: './keyboards-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: KeyboardsService }
  ]
})
export class KeyboardsPageComponent {
  pageTitle={
    titulo: 'Teclados',
    itemMenu:'Estoque',
    itemSubmenu:'Teclados',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início',
  };
  keyboards$!: Observable<Keyboard[]>;
  columns: TableColumn<Keyboard>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'connectionType', label: 'Tipo de conexão' },
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
  addRoute = '/inventory/keyboards';


  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
  ) {

  }



}
