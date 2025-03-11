import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { CartridgeTonersService } from '../../services/cartridge-toners.service';
import { Observable } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { CartridgeToner } from '../../models/cartridge-toner';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-cartridge-toners-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './cartridge-toners-page.component.html',
  styleUrl: './cartridge-toners-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: CartridgeTonersService }
  ]
})
export class CartridgeTonersPageComponent {

  pageTitle = {
      titulo: 'Toners de Impressora',
      itemMenu: 'Estoque',
      itemSubmenu: 'Toners de Impressora',
      alignment: 'center',
      homeIcon: true,
      homeText: 'Início'
    };

    cases$!: Observable<CartridgeToner[]>;
    columns: TableColumn<CartridgeToner>[] = [
      { value: 'id', label: '#' },
      { value: 'model', label: 'Modelo' },
      { value: 'compatibility', label: 'Compatibilidade' },
      { value: 'quantity', label: 'Quantidade' },
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
    addRoute = '/inventory/cartridgetoners';


    constructor(
      private router: Router,
      private requestService: RequestService,
      private modalService: ModalService
    ) {
    }
}
