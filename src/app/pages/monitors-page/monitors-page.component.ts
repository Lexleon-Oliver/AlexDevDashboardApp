import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { MonitorsService } from '../../services/monitors.service';
import { Observable } from 'rxjs';
import { Monitor } from '../../models/monitor';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-monitors-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './monitors-page.component.html',
  styleUrl: './monitors-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: MonitorsService }
  ]
})
export class MonitorsPageComponent {

  pageTitle = {
    titulo: 'Monitores',
    itemMenu: 'Estoque',
    itemSubmenu: 'Monitores',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  graphicscards$!: Observable<Monitor[]>;
  columns: TableColumn<Monitor>[] = [
    { value: 'id', label: '#' },
    { value: 'brand', label: 'Marca' },
    { value: 'model', label: 'Modelo' },
    { value: 'size', label: 'Tamanho' },
    { value: 'graphicsConnectionsTypes', label: 'Conexões' },
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
  addRoute = '/inventory/monitors';


  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
  }

}
