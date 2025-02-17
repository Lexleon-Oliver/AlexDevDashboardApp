import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { CommonModule } from '@angular/common';
import { PurchaseordersService } from '../../services/purchaseorders.service';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../../models/purchase-order';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-purchaseorders-page',
  standalone: true,
  imports: [
     CommonModule,
    GenericPageComponent
  ],
  templateUrl: './purchaseorders-page.component.html',
  styleUrl: './purchaseorders-page.component.scss',
  providers: [
      { provide: BASE_SERVICE, useExisting: PurchaseordersService }
    ]
})
export class PurchaseordersPageComponent {

  pageTitle = {
      titulo: 'Ordens de compras',
      itemMenu:'Documentos',
      itemSubmenu:'Ordens de Compras',
      alignment:'center',
      homeIcon: true,
      homeText: 'Início'
    };
    pruchaseOrders$!: Observable<PurchaseOrder[]>;
    columns: TableColumn<PurchaseOrder>[] = [
      { value: 'id', label: '#' },
      { value: 'items', label: 'Produtos' },
      { value: 'vendor', label: 'Fornecedor' },
      { value: 'date', label: 'Pedido em' },
      { value: 'received', label: 'Recebido' },
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
    addRoute = '/docs/purchaseorders';


    constructor(
      private router: Router,
      public requestService:RequestService,
      private modalService:ModalService,
    ) {

    }


}
