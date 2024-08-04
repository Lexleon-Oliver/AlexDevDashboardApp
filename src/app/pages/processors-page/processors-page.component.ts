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

@Component({
  selector: 'app-processors-page',
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
  templateUrl: './processors-page.component.html',
  styleUrl: './processors-page.component.scss'
})
export class ProcessorsPageComponent implements OnInit {
  rounded: boolean=true;
  disabled: boolean= false;
  processors$!: Observable<Processor[]>;
  _processors: Processor[] = []
  columns: TableColumn<Processor>[] = [
    { value: 'id', label: '#' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'cpuType', label: 'Socket' },
    { value: 'frequency', label: 'Velocidade' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  processorToRemove!:Processor;

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

  onAdd(){
    this.router.navigate(['/inventory/cpus/new']);
  }

  private setProcessors():void{
    this.processors$ = this.processorsServices.list().pipe(
      tap((items) => {
        this._processors = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(processor:Processor){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/cpus', processor.id, 'edit']);
  }

  onRemove(processor:Processor){

    this.processorToRemove = processor;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.processorToRemove) {
      this.processorsServices.delete(this.processorToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setProcessors();
          this.modalService.cancelAction()
          this.processorToRemove = new Processor();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
