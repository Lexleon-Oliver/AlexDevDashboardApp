import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { SpeakersService } from '../../services/speakers.service';
import { Speaker } from '../../models/speaker';
import { Observable } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-speakers-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './speakers-page.component.html',
  styleUrl: './speakers-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: SpeakersService }
  ]
})
export class SpeakersPageComponent {

  pageTitle = {
    titulo: 'Caixas de som',
    itemMenu: 'Estoque',
    itemSubmenu: 'Monitores',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  speakers$!: Observable<Speaker[]>;
  columns: TableColumn<Speaker>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
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
  addRoute = '/inventory/speakers';


  constructor(
    private router: Router,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
  }


}
