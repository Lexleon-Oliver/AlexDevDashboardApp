import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Case } from '../../models/case';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { CasesService } from '../../services/cases.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-cases-page',
  standalone: true,
  imports: [

    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './cases-page.component.html',
  styleUrl: './cases-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: CasesService }
  ]
})
export class CasesPageComponent {
  pageTitle = {
    titulo: 'Gabinetes',
    itemMenu: 'Estoque',
    itemSubmenu: 'Gabinetes',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  cases$!: Observable<Case[]>;
  columns: TableColumn<Case>[] = [
    { value: 'id', label: '#' },
    { value: 'color', label: 'Cor' },
    { value: 'numberOfBays', label: 'Número de Baias' },
    { value: 'hasDVD', label: 'DVD' },
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
  addRoute = '/inventory/cases';


  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
  }


}
