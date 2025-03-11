import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { ComputersService } from '../../services/computers.service';
import { Observable } from 'rxjs';
import { Computer } from '../../models/computer';
import { TableColumn } from '../../models/table-column';
import { Department } from '../../models/department';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-computers-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './computers-page.component.html',
  styleUrl: './computers-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: ComputersService }
  ]
})
export class ComputersPageComponent {
  pageTitle = {
    titulo: 'Computadores',
    itemMenu: 'Parque de Máquinas',
    itemSubmenu: 'Computadores',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  computers$!: Observable<Computer[]>;
  columns: TableColumn<Department>[] = [
    { value: 'id', label: '#' },
    { value: 'name', label: 'Nome' },

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
  addRoute = '/itassets/computers';


  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
  }

}
