import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { TableComponent } from '../../components/table/table.component';
import { catchError, Observable, of, tap } from 'rxjs';
import { Keyboard } from '../../models/keyboard';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { RequestService } from '../../services/request.service';
import { KeyboardsService } from '../../services/keyboards.service';

@Component({
  selector: 'app-keyboards-page',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    ButtonComponent,
    TableComponent,
    ConfirmModalComponent,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './keyboards-page.component.html',
  styleUrl: './keyboards-page.component.scss'
})
export class KeyboardsPageComponent {
  rounded: boolean=true;
  disabled: boolean= false;
  keyboards$!: Observable<Keyboard[]>;
  _keyboards: Keyboard[] = []
  columns: TableColumn<Keyboard>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'connectionType', label: 'Tipo de conexão' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  keyboardToRemove!:Keyboard;

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
        this._keyboards = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );

  }

  onEdit(item:Keyboard){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/keyboards', item.id, 'edit']);
  }

  onRemove(item:Keyboard){

    this.keyboardToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.keyboardToRemove) {
      this.keyboardsServices.delete(this.keyboardToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setKeyboards();
          this.modalService.cancelAction()
          this.keyboardToRemove = new Keyboard();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }

}
