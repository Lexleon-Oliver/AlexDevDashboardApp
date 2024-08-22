import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PowerSupply } from '../../models/power-supply';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { PowerSuppliesService } from '../../services/power-supplies.service';
import { CommonModule } from '@angular/common';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-power-supply-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,

  ],
  templateUrl: './power-supply-page.component.html',
  styleUrl: './power-supply-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: PowerSuppliesService }
  ]
})
export class PowerSupplyPageComponent {

  pageTitle = {
    titulo: 'Fontes de Energia',
    itemMenu:'Estoque',
    itemSubmenu:'Fontes de Energia',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início'
  };
  powerSupplies$!: Observable<PowerSupply[]>;
  columns: TableColumn<PowerSupply>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'power', label: 'Potência' },
    { value: 'inputVoltage', label: 'Alimentação' },
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
  addRoute = '/inventory/powersupplies';

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
  ) {

  }
}
