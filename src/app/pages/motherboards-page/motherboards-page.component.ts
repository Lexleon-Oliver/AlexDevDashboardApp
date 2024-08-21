import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Motherboard } from '../../models/motherboard';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
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
export class MotherboardsPageComponent implements OnInit {
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
  addRoute = '/inventory/motherboards';
  itemsList: Motherboard[] = [];
  itemToRemove!: Motherboard;


  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private motherboardsServices:MotherboardsService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setMotherboards();

  }

  private setMotherboards():void{
    this.motherboards$ = this.motherboardsServices.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }



  onEdit(item:  Motherboard) {
    this.requestService.showLoading();
    this.router.navigate([`/inventory/motherboards/${item.id}/edit`]);
  }

  onRemove(item: Motherboard) {
    this.itemToRemove = item;
    this.modalService.openModal('removerItemTable');
  }


  executarRemocao() {
    if (this.itemToRemove) {
      this.motherboardsServices.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setMotherboards();
          this.modalService.cancelAction();
          this.itemToRemove = {} as Motherboard;
        },
        error: (err) => {
          this.modalService.cancelAction();
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
