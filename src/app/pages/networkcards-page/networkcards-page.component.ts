import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { NetworkcardsService } from '../../services/networkcards.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NetworkCard } from '../../models/networkcard';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-networkcards-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './networkcards-page.component.html',
  styleUrl: './networkcards-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: NetworkcardsService }
  ]
})
export class NetworkcardsPageComponent {
  pageTitle = {
    titulo: 'Placas de Rede',
    itemMenu:'Estoque',
    itemSubmenu:'Placas de Rede',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início'
  };
  networkcards$!: Observable<NetworkCard[]>;
  columns: TableColumn<NetworkCard>[] = [
    { value: 'id', label: '#' },
    { value: 'brand', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'macAddress', label: 'MAC' },
    { value: 'transferRate', label: 'Taxa Transferência' },
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
  addRoute = '/inventory/networkcards';


  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
  ) {

  }


}
