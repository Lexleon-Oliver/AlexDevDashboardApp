import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Motherboard } from '../../models/motherboard';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { MotherboardsService } from '../../services/motherboards.service';

@Component({
  selector: 'app-motherboards-page',
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
  templateUrl: './motherboards-page.component.html',
  styleUrl: './motherboards-page.component.scss'
})
export class MotherboardsPageComponent implements OnInit {
  rounded: boolean=true;
  disabled: boolean= false;
  motherboards$!: Observable<Motherboard[]>;
  _motherboards: Motherboard[] = []
  columns: TableColumn<Motherboard>[] = [
    { value: 'id', label: '#' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'cpuType', label: 'Socket' },
    { value: 'memoryType', label: 'Memoria' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  motherboardToRemove!:Motherboard;

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

  onAdd(){
    this.router.navigate(['/inventory/motherboards/new']);
  }

  private setMotherboards():void{
    this.motherboards$ = this.motherboardsServices.list().pipe(
      tap((items) => {
        this._motherboards = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(motherboard:Motherboard){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/motherboards', motherboard.id, 'edit']);
  }

  onRemove(motherboard:Motherboard){

    this.motherboardToRemove = motherboard;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.motherboardToRemove) {
      this.motherboardsServices.delete(this.motherboardToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setMotherboards();
          this.modalService.cancelAction()
          this.motherboardToRemove = new Motherboard();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
