import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { DepartmentsService } from '../../services/departments.service';
import { Observable } from 'rxjs';
import { Department } from '../../models/department';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-departments-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './departments-page.component.html',
  styleUrl: './departments-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: DepartmentsService }
  ]
})
export class DepartmentsPageComponent {
  pageTitle = {
    titulo: 'Departamentos',
    itemMenu: 'Parque de Máquinas',
    itemSubmenu: 'Departamentos',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  departments$!: Observable<Department[]>;
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
  addRoute = '/itassets/departments';


  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
  }



}
