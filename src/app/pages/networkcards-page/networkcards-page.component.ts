import { Component, OnInit } from '@angular/core';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';
import { NetworkcardsService } from '../../services/networkcards.service';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, tap } from 'rxjs';
import { NetworkCard } from '../../models/networkcard';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
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
export class NetworkcardsPageComponent implements OnInit {
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
  buttonsAction: ButtonModel[]=[]
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
  itemsList: NetworkCard[] = [];
  itemToRemove!: NetworkCard;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private networkcardsServices:NetworkcardsService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setNetworkcards();

  }

  private setNetworkcards():void{
    this.networkcards$ = this.networkcardsServices.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }



  onEdit(item:  NetworkCard) {
    this.requestService.showLoading();
    this.router.navigate([`/inventory/networkcards/${item.id}/edit`]);
  }

  onRemove(item: NetworkCard) {
    this.itemToRemove = item;
    this.modalService.openModal('removerItemTable');
  }


  executarRemocao() {
    if (this.itemToRemove) {
      this.networkcardsServices.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setNetworkcards();
          this.modalService.cancelAction();
          this.itemToRemove = {} as NetworkCard;
        },
        error: (err) => {
          this.modalService.cancelAction();
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
