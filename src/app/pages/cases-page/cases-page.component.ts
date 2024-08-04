import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { catchError, Observable, of, tap } from 'rxjs';
import { Case } from '../../models/case';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-cases-page',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    ButtonComponent,
    TableComponent,
    LoadingComponent,
    CommonModule,
    ConfirmModalComponent,
  ],
  templateUrl: './cases-page.component.html',
  styleUrl: './cases-page.component.scss'
})
export class CasesPageComponent {
  rounded: boolean=true;
  disabled: boolean= false;
  cases$!: Observable<Case[]>;
  _cases: Case[] = []
  columns: TableColumn<Case>[] = [
    { value: 'id', label: '#' },
    { value: 'color', label: 'Cor' },
    { value: 'numberOfBays', label: 'Número de Baias' },
    { value: 'hasDVD', label: 'DVD' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  caseToRemove!:Case;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private casesServices:CasesService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setCases();


  }

  onAdd(){
    this.router.navigate(['/inventory/cases/new']);
  }

  private setCases():void{
    this.cases$ = this.casesServices.list().pipe(
      tap((items) => {
        this._cases = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );

  }

  onEdit(item:Case){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/cases', item.id, 'edit']);
  }

  onRemove(item:Case){

    this.caseToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.caseToRemove) {
      this.casesServices.delete(this.caseToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setCases();
          this.modalService.cancelAction()
          this.caseToRemove = new Case();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }

}
