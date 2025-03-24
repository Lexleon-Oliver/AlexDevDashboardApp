import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Msoffice } from '../../models/msoffice';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { MsofficesService } from '../../services/msoffices.service';

@Component({
  selector: 'app-msoffices-page',
  standalone: true,
  imports: [
    GenericPageComponent
  ],
  templateUrl: './msoffices-page.component.html',
  styleUrl: './msoffices-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: MsofficesService }
  ]
})
export class MsofficesPageComponent {

    pageTitle = {
          titulo: 'Offices',
          itemMenu:'Documentos',
          itemSubmenu:'Offices',
          alignment:'center',
          homeIcon: true,
          homeText: 'Início'
        };
        msoofices$!: Observable<Msoffice[]>;
        columns: TableColumn<Msoffice>[] = [
          { value: 'id', label: '#' },
          { value: 'serial', label: 'Chave Ativação' },
          { value: 'title', label: 'Descrição' },

        ];
        confirmModal = {
          id: 'removerItemTable',
          title: 'Excluir',
          text: 'Tem certeza que deseja remover o office? Após a confirmação, o registro será excluído e NÃO PODERÁ mais ser recuperado!',
          cancelText: 'Cancelar',
          cancelClass: 'secondary',
          confirmText: 'Confirmar Exclusão',
          confirmClass: 'danger'
        };
        addRoute = '/softwares/msoffices';


        constructor(
          private router: Router,
          public requestService:RequestService,
          private modalService:ModalService,
        ) {

        }
}
