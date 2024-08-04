import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, tap } from 'rxjs';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { Memory } from '../../models/memory';
import { MemoriesService } from '../../services/memories.service';

@Component({
  selector: 'app-memories-page',
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
  templateUrl: './memories-page.component.html',
  styleUrl: './memories-page.component.scss'
})
export class MemoriesPageComponent implements OnInit{

  rounded: boolean=true;
  disabled: boolean= false;
  memories$!: Observable<Memory[]>;
  _memories: Memory[] = []
  columns: TableColumn<Memory>[] = [
    { value: 'id', label: '#' },
    { value: 'capacity', label: 'Capacidade' },
    { value: 'type', label: 'Tipo' },
    { value: 'frequency', label: 'Velocidade' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  memoryToRemove!:Memory;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private memoriesServices:MemoriesService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setMemories();

  }

  onAdd(){
    this.router.navigate(['/inventory/memories/new']);
  }

  private setMemories():void{
    this.memories$ = this.memoriesServices.list().pipe(
      tap((items) => {
        this._memories = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(memory:Memory){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/memories', memory.id, 'edit']);
  }

  onRemove(memory:Memory){

    this.memoryToRemove = memory;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.memoryToRemove) {
      this.memoriesServices.delete(this.memoryToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setMemories();
          this.modalService.cancelAction()
          this.memoryToRemove = new Memory();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }

}
