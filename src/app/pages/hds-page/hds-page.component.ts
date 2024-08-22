import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Hd } from '../../models/hd';
import { TableColumn } from '../../models/table-column';
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

  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {

  }


}
