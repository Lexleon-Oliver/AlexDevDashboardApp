import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, tap } from 'rxjs';
import { Case } from '../../models/case';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { CasesService } from '../../services/cases.service';
import { BASE_SERVICE, GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'app-cases-page',
  standalone: true,
  imports: [

    CommonModule,
    GenericPageComponent,
  ],
  templateUrl: './cases-page.component.html',
  styleUrl: './cases-page.component.scss',
  providers: [
    { provide: BASE_SERVICE, useExisting: CasesService }
  ]
})
export class CasesPageComponent {
  pageTitle = {
    titulo: 'Gabinetes',
    itemMenu: 'Estoque',
    itemSubmenu: 'Gabinetes',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };

  cases$!: Observable<Case[]>;
  columns: TableColumn<Case>[] = [
    { value: 'id', label: '#' },
    { value: 'color', label: 'Cor' },
    { value: 'numberOfBays', label: 'Número de Baias' },
    { value: 'hasDVD', label: 'DVD' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[] = [];
  confirmModal = {
    id: 'removerItemTable',
    title: 'Excluir Tarefa',
    text: 'Tem certeza que deseja remover a tarefa? Após a confirmação, o registro será excluído e NÃO PODERÁ mais ser recuperado!',
    cancelText: 'Cancelar',
    cancelClass: 'secondary',
    confirmText: 'Confirmar Exclusão',
    confirmClass: 'danger'
  };
  addRoute = '/inventory/cases';
  itemsList: Case[] = [];
  itemToRemove!: Case;

  constructor(
    private router: Router,
    private casesService: CasesService,
    private requestService: RequestService,
    private modalService: ModalService
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this))
    );
  }

  ngOnInit() {
    this.setCases();
    console.log("Teste Cases-page:",this.addRoute);

  }

  private setCases(): void {
    this.cases$ = this.casesService.list().pipe(
      tap((items) => {
        this.itemsList = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(caseItem: Case) {
    this.requestService.showLoading();
    this.router.navigate([`/inventory/cases/${caseItem.id}/edit`]);
  }

  onRemove(caseItem: Case) {
    this.itemToRemove = caseItem;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.itemToRemove) {
      this.casesService.delete(this.itemToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setCases();
          this.modalService.cancelAction();
          this.itemToRemove = {} as Case;
        },
        error: (err) => {
          this.modalService.cancelAction();
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
