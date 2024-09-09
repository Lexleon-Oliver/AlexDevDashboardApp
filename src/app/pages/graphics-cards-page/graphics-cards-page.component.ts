import { GraphicsCard } from './../../models/graphics-card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { GraphicscardsService } from '../../services/graphicscards.service';
import { Observable } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-graphics-cards-page',
  standalone: true,
  imports: [

    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './graphics-cards-page.component.html',
  styleUrl: './graphics-cards-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: GraphicscardsService }
  ]
})
export class GraphicsCardsPageComponent {

  pageTitle = {
    titulo: 'Placas de vídeo',
    itemMenu: 'Estoque',
    itemSubmenu: 'Placas de vídeo',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  graphicscards$!: Observable<GraphicsCard[]>;
  columns: TableColumn<GraphicsCard>[] = [
    { value: 'id', label: '#' },
    { value: 'brand', label: 'Marca' },
    { value: 'model', label: 'Modelo' },
    { value: 'capacity', label: 'Capacidade' },
    { value: 'graphicsConnections', label: 'Conexões' },
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
  addRoute = '/inventory/graphicscards';


  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
  }

}
