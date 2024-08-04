import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { TableComponent } from '../../components/table/table.component';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hd } from '../../models/hd';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { HdsService } from '../../services/hds.service';

@Component({
  selector: 'app-hds-page',
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
  templateUrl: './hds-page.component.html',
  styleUrl: './hds-page.component.scss'
})
export class HdsPageComponent {
  rounded: boolean=true;
  disabled: boolean= false;
  hds$!: Observable<Hd[]>;
  _hds: Hd[] = []
  columns: TableColumn<Hd>[] = [
    { value: 'id', label: '#' },
    { value: 'brand', label: 'Marca' },
    { value: 'capacity', label: 'Capacidade' },
    { value: 'type', label: 'Tipo' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  hdToRemove!:Hd;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private hdsServices:HdsService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setHds();

  }

  onAdd(){
    this.router.navigate(['/inventory/hds/new']);
  }

  private setHds():void{
    this.hds$ = this.hdsServices.list().pipe(
      tap((items) => {
        this._hds = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(hd:Hd){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/hds', hd.id, 'edit']);
  }

  onRemove(hd:Hd){

    this.hdToRemove = hd;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.hdToRemove) {
      this.hdsServices.delete(this.hdToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setHds();
          this.modalService.cancelAction()
          this.hdToRemove = new Hd();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }

}
