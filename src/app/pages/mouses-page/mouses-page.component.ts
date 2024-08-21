import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { TableComponent } from '../../components/table/table.component';
import { Mouse } from '../../models/mouse';
import { catchError, Observable, of, tap } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { MousesService } from '../../services/mouses.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-mouses-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './mouses-page.component.html',
  styleUrl: './mouses-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: MousesService }
  ]
})
export class MousesPageComponent {
  pageTitle = {
    titulo: 'Mouses',
    itemMenu:'Estoque',
    itemSubmenu:'Mouses',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início'
  };
  mouses$!: Observable<Mouse[]>;
  columns: TableColumn<Mouse>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'connectionType', label: 'Tipo de conexão' },
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

  addRoute = '/inventory/mouses';
  itemsList: Mouse[] = [];
  itemToRemove!: Mouse;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private mousesServices:MousesService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setMouses();

  }

  private setMouses():void{
    this.mouses$ = this.mousesServices.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(item:Mouse) {
    this.requestService.showLoading();
    this.router.navigate([`/inventory/mouses/${item.id}/edit`]);
  }


  onRemove(item:Mouse){
    this.itemToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.itemToRemove) {
      this.mousesServices.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setMouses();
          this.modalService.cancelAction();
          this.itemToRemove = {} as Mouse;
        },
        error: (err) => {
          this.modalService.cancelAction();
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
