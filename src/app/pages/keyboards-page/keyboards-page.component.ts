import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Keyboard } from '../../models/keyboard';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { RequestService } from '../../services/request.service';
import { KeyboardsService } from '../../services/keyboards.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-keyboards-page',
  standalone: true,
  imports: [
    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './keyboards-page.component.html',
  styleUrl: './keyboards-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: KeyboardsService }
  ]
})
export class KeyboardsPageComponent {
  pageTitle={
    titulo: 'Teclados',
    itemMenu:'Estoque',
    itemSubmenu:'Teclados',
    alignment:'center',
    homeIcon: true,
    homeText: 'Início',
  };
  keyboards$!: Observable<Keyboard[]>;
  columns: TableColumn<Keyboard>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'connectionType', label: 'Tipo de conexão' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[];
  confirmModal = {
    id: 'removerItemTable',
    title: 'Excluir Tarefa',
    text: 'Tem certeza que deseja remover a tarefa? Após a confirmação, o registro será excluído e NÃO PODERÁ mais ser recuperado!',
    cancelText: 'Cancelar',
    cancelClass: 'secondary',
    confirmText: 'Confirmar Exclusão',
    confirmClass: 'danger'
  };
  addRoute = '/inventory/keyboards';
  itemsList: Keyboard[] = [];
  itemToRemove!: Keyboard;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private keyboardsServices:KeyboardsService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setKeyboards();


  }

  onAdd(){
    this.router.navigate(['/inventory/keyboards/new']);
  }

  private setKeyboards():void{
    this.keyboards$ = this.keyboardsServices.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );

  }

  onEdit(caseItem: Keyboard) {
    this.requestService.showLoading();
    this.router.navigate([`/inventory/keyboards/${caseItem.id}/edit`]);
  }

  onRemove(item:Keyboard){
    this.itemToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.itemToRemove) {
      this.keyboardsServices.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setKeyboards();
          this.modalService.cancelAction()
          this.itemToRemove = new Keyboard();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }

}
