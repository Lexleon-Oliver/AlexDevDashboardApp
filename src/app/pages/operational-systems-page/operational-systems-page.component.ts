import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { OperationalSystemsService } from '../../services/operational-systems.service';
import { Observable } from 'rxjs';
import { OperationalSystem } from '../../models/operational-system';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-operational-systems-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './operational-systems-page.component.html',
  styleUrl: './operational-systems-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: OperationalSystemsService }
  ]
})
export class OperationalSystemsPageComponent {
  pageTitle = {
    titulo: 'Sistemas Operacionais',
    itemMenu: 'Softwares',
    itemSubmenu: 'Sistemas Operacionais',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  operationalSystems$!: Observable<OperationalSystem[]>;
  columns: TableColumn<OperationalSystem>[] = [
    { value: 'id', label: '#' },
    { value: 'name', label: 'Nome' },
    { value: 'installationDate', label: 'Data Instalação' },
    { value: 'serialNumber', label: 'Serial' },
    { value: 'workgroup', label: 'Domínio' },

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
  addRoute = '/softwares/operationalsystems';


  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
  }

}
