import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Motherboard } from '../../models/motherboard';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { MotherboardsService } from '../../services/motherboards.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-motherboards-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './motherboards-page.component.html',
  styleUrl: './motherboards-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: MotherboardsService }
  ]
})
export class MotherboardsPageComponent {
  pageTitle = {
    titulo: 'Placas-mãe',
    itemMenu:'Estoque',
    itemSubmenu:'Placas-mãe',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início'
  };
  motherboards$!: Observable<Motherboard[]>;
  columns: TableColumn<Motherboard>[] = [
    { value: 'id', label: '#' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'cpuType', label: 'Socket' },
    { value: 'memoryType', label: 'Memoria' },
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
  addRoute = '/inventory/motherboards';



  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
  ) {

  }

}
