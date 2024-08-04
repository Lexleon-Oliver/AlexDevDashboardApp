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

@Component({
  selector: 'app-mouses-page',
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
  templateUrl: './mouses-page.component.html',
  styleUrl: './mouses-page.component.scss'
})
export class MousesPageComponent {

  rounded: boolean=true;
  disabled: boolean= false;
  mouses$!: Observable<Mouse[]>;
  _mouses: Mouse[] = []
  columns: TableColumn<Mouse>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'connectionType', label: 'Tipo de conexão' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  mouseToRemove!:Mouse;

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

  onAdd(){
    this.router.navigate(['/inventory/mouses/new']);
  }

  private setMouses():void{
    this.mouses$ = this.mousesServices.list().pipe(
      tap((items) => {
        this._mouses = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );

  }

  onEdit(item:Mouse){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/mouses', item.id, 'edit']);
  }

  onRemove(item:Mouse){

    this.mouseToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.mouseToRemove) {
      this.mousesServices.delete(this.mouseToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setMouses();
          this.modalService.cancelAction()
          this.mouseToRemove = new Mouse();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
