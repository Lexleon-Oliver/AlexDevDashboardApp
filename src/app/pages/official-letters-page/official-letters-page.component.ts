import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OfficialLetter } from '../../models/official-letter';
import { TableColumn } from '../../models/table-column';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { OfficialLettersService } from '../../services/official-letters.service';

@Component({
  selector: 'app-official-letters-page',
  standalone: true,
  imports: [
    GenericPageComponent
  ],
  templateUrl: './official-letters-page.component.html',
  styleUrl: './official-letters-page.component.scss',
  providers: [
        { provide: BASE_SERVICE, useExisting: OfficialLettersService }
      ]
})
export class OfficialLettersPageComponent {

  pageTitle = {
        titulo: 'Ofícios',
        itemMenu:'Documentos',
        itemSubmenu:'Ofícios',
        alignment:'center',
        homeIcon: true,
        homeText: 'Início'
      };
      officialletters$!: Observable<OfficialLetter[]>;
      columns: TableColumn<OfficialLetter>[] = [
        { value: 'id', label: '#' },
        { value: 'cod', label: 'N°' },
        { value: 'title', label: 'Assunto' },
        { value: 'content', label: 'Conteúdo' },
        { value: 'sender', label: 'De' },
        { value: 'recipient', label: 'Para' },
        { value: 'sentAt', label: 'Enviado em' },
        { value: 'receivedAt', label: 'Recebido em' },
      ];
      confirmModal = {
        id: 'removerItemTable',
        title: 'Excluir Ofício',
        text: 'Tem certeza que deseja remover o ofício? Após a confirmação, o registro será excluído e NÃO PODERÁ mais ser recuperado!',
        cancelText: 'Cancelar',
        cancelClass: 'secondary',
        confirmText: 'Confirmar Exclusão',
        confirmClass: 'danger'
      };
      addRoute = '/docs/officialletters';


      constructor(
        private router: Router,
        public requestService:RequestService,
        private modalService:ModalService,
      ) {

      }

}
