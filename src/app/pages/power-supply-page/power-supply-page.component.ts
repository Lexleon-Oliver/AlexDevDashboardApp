import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Observable, catchError, of, tap } from 'rxjs';
import { PowerSupply } from '../../models/power-supply';
import { TableColumn } from '../../models/table-column';
import { ButtonModel } from '../../models/button-model';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { ModalService } from '../../services/modal.service';
import { PowerSuppliesService } from '../../services/power-supplies.service';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-power-supply-page',
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
  templateUrl: './power-supply-page.component.html',
  styleUrl: './power-supply-page.component.scss'
})
export class PowerSupplyPageComponent {

  rounded: boolean=true;
  disabled: boolean= false;
  powerSupplies$!: Observable<PowerSupply[]>;
  _powerSupplies: PowerSupply[] = []
  columns: TableColumn<PowerSupply>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'power', label: 'Potência' },
    { value: 'inputVoltage', label: 'Alimentação' },
    { value: 'inUse', label: 'Em uso' },
  ];
  buttonsAction: ButtonModel[]=[]
  powerSupplyToRemove!:PowerSupply;

  constructor(
    private router: Router,
    public requestService:RequestService,
    private modalService:ModalService,
    private powerSuppliesServices:PowerSuppliesService,
  ) {
    this.buttonsAction.push(
      new ButtonModel('', 'bi bi-pencil-square', 'default', 'warning', 'small', false, false, this.onEdit.bind(this)),
      new ButtonModel('', 'bi bi-trash', 'default', 'danger', 'small', false, false, this.onRemove.bind(this)),
      );
  }

  ngOnInit() {
    this.setPowerSupplies();

  }

  onAdd(){
    this.router.navigate(['/inventory/powersupplies/new']);
  }

  private setPowerSupplies():void{
    this.powerSupplies$ = this.powerSuppliesServices.list().pipe(
      tap((items) => {
        this._powerSupplies = items;
      }),
      catchError((err) => {
        this.requestService.trataErro(err);
        return of([]);
      })
    );
  }

  onEdit(item:PowerSupply){
    this.requestService.showLoading();
    this.router.navigate(['/inventory/powersupplies', item.id, 'edit']);
  }

  onRemove(item:PowerSupply){

    this.powerSupplyToRemove = item;
    this.modalService.openModal('removerItemTable');
  }

  executarRemocao() {
    if (this.powerSupplyToRemove) {
      this.powerSuppliesServices.delete(this.powerSupplyToRemove.id).subscribe({
        next: (response) => {
          this.requestService.trataSucesso(response);
          this.setPowerSupplies();
          this.modalService.cancelAction()
          this.powerSupplyToRemove = new PowerSupply();
        },
        error: (err) => {
          this.modalService.cancelAction()
          this.requestService.trataErro(err);
        }
      });
    }
  }
}
