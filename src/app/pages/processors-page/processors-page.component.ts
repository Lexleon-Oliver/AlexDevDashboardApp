import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, tap } from 'rxjs';
import { Processor } from '../../models/processor';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { ProcessorsService } from '../../services/processors.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-processors-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './processors-page.component.html',
  styleUrl: './processors-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: ProcessorsService }
  ]
})
export class ProcessorsPageComponent implements OnInit {
  pageTitle = {
    titulo: 'Processadores',
    itemMenu:'Estoque',
    itemSubmenu:'Processadores',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início'
  };
  processors$!: Observable<Processor[]>;
  columns: TableColumn<Processor>[] = [
    { value: 'id', label: '#' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'cpuType', label: 'Socket' },
    { value: 'frequency', label: 'Velocidade' },
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
  addRoute = '/inventory/cpus';
  itemsList: Processor[] = [];
  itemToRemove!: Processor;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private processorsServices:ProcessorsService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setProcessors();

  }

  private setProcessors():void{
    this.processors$ = this.processorsServices.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(item:Processor){
    this.requestService.showLoading();
    this.router.navigate([`/inventory/cpus/${item.id}/edit`]);
  }

  onRemove(item:Processor){
    this.itemToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.itemToRemove) {
      this.processorsServices.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setProcessors();
          this.modalService.cancelAction()
          this.itemToRemove = {} as Processor;
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
