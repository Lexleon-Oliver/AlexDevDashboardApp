import { Component, Inject, InjectionToken } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { SimpleCardComponent } from '../../components/simple-card/simple-card.component';
import { FormComponent } from '../../components/form/form.component';
import { Computer } from '../../models/computer';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonModel } from '../../models/button-model';
import { ActivatedRoute } from '@angular/router';
import { ComputersService } from '../../services/computers.service';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';
import { InputFormComponent } from "../../components/input-form/input-form.component";
import { TableComponent } from '../../components/table/table.component';
import { BASE_SERVICE } from '../generic-page/generic-page.component';
import { TableColumn } from '../../models/table-column';
import { OperationalSystem } from '../../models/operational-system';
import { OperationalSystemsService } from '../../services/operational-systems.service';
import { GenericListTableComponent } from '../../components/generic-list-table/generic-list-table.component';
import { Processor } from '../../models/processor';
import { ProcessorsService } from '../../services/processors.service';

export const OS_SERVICE = new InjectionToken<OperationalSystemsService>('OperationalSystemsService');
export const CPU_SERVICE = new InjectionToken<ProcessorsService>('ProcessorsService');

@Component({
  selector: 'app-computer-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    TableComponent,
    GenericListTableComponent,

],
  templateUrl: './computer-form.component.html',
  styleUrl: './computer-form.component.scss',
  providers: [
    { provide: OS_SERVICE, useExisting: OperationalSystemsService },
    { provide: CPU_SERVICE, useExisting: ProcessorsService },
  ]
})
export class ComputerFormComponent {

  computer:Computer= new Computer();
  system!:OperationalSystem;
  cpu!:Processor;

  form!: FormGroup;
  formButtons: ButtonModel[] = [];
  pageTitle = {
    titulo: 'Sistemas Operacionais',
    itemMenu: 'Softwares',
    itemSubmenu: 'Sistemas Operacionais',
    alignment: 'center',
    homeIcon: true,
    homeText: 'Início'
  };
  columns: TableColumn<OperationalSystem>[] = [
    { value: 'id', label: '#' },
    { value: 'name', label: 'Nome' },
    { value: 'installationDate', label: 'Data Instalação' },
    { value: 'serialNumber', label: 'Serial' },
    { value: 'workgroup', label: 'Domínio' },
  ];
  columnsCPU: TableColumn<Processor>[] = [
    { value: 'id', label: '#' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'cpuType', label: 'Socket' },
    { value: 'frequency', label: 'Velocidade' },
    { value: 'inUse', label: 'Em uso' },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private computersService: ComputersService,
    public requestService: RequestService,
    @Inject(OS_SERVICE) public osService: OperationalSystemsService,
    @Inject(CPU_SERVICE) public cpuService: ProcessorsService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      name: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]],
      inUse: [false],
    });
    this.formButtons.push(
      new ButtonModel('', 'bi bi-arrow-return-left', 'default', 'secondary', 'small', false, false, this.onCancel.bind(this)),
      new ButtonModel('', 'bi bi-floppy', 'default', 'success', 'small', false, true, this.onAdd.bind(this),this.form),
    );
  }

  ngOnInit() {
    if(this.requestService.isLoading){
      this.requestService.hideLoading();
    }
    const itemData: Computer = this.route.snapshot.data['computer'];

    if (itemData.id!==0) {

      this.computer = new Computer(itemData);
      this.form.patchValue(itemData);
    }
  }

  onCancel() {
    this.location.back();

  }

  onAdd() {
    this.requestService.showLoading()
    const formData = this.form.value;
    formData.color = formData.color.toUpperCase();

    Object.assign(this.computer, formData);
    let itemData = new Computer(this.computer);
    this.computersService.save(itemData).subscribe({
      next:(res:any)=>{
        this.requestService.hideLoading()
        this.requestService.trataSucesso(res)
        setTimeout(() => {
          this.onCancel();
        }, 3000);
      },
      error: (error)=>{
        this.requestService.hideLoading()
        this.requestService.trataErro(error );
      }
    });
  }

  onItemSelected(item: Map<string, any>) {
    if (item.has("Sistema Operacional")) {
      this.system = item.get("Sistema Operacional");
      console.log("Sistema: ", this.system);

    }
    if (item.has("CPU")) {
      this.cpu = item.get("CPU");
      console.log("CPU: ", this.cpu);
    }


  }
}
