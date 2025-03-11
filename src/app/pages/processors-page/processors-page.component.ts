import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Processor } from '../../models/processor';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { ProcessorsService } from '../../services/processors.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-processors-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './processors-page.component.html',
  styleUrl: './processors-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: ProcessorsService }
  ]
})
export class ProcessorsPageComponent {
  pageTitle = {
    titulo: 'Processadores',
    itemMenu:'Estoque',
    itemSubmenu:'Processadores',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início'
  };
  processors$!: Observable<Processor[]>;
  columns: TableColumn<Processor>[] = [
    { value: 'id', label: '#' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'cpuType', label: 'Socket' },
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
  addRoute = '/inventory/cpus';


  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
  ) {

  }

}
