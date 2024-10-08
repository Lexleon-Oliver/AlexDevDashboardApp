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
import { TableColumn } from '../../models/table-column';
import { OperationalSystem } from '../../models/operational-system';
import { OperationalSystemsService } from '../../services/operational-systems.service';
import { GenericListTableComponent } from '../../components/generic-list-table/generic-list-table.component';
import { Processor } from '../../models/processor';
import { ProcessorsService } from '../../services/processors.service';
import { MotherboardsService } from '../../services/motherboards.service';
import { Motherboard } from '../../models/motherboard';
import { CasesService } from '../../services/cases.service';
import { Case } from '../../models/case';
import { KeyboardsService } from '../../services/keyboards.service';
import { Keyboard } from '../../models/keyboard';

export const OS_SERVICE = new InjectionToken<OperationalSystemsService>('OperationalSystemsService');
export const CPU_SERVICE = new InjectionToken<ProcessorsService>('ProcessorsService');
export const MOTHERBOARD_SERVICE = new InjectionToken<MotherboardsService>('MotherboardsService');
export const CASE_SERVICE = new InjectionToken<CasesService>('CasesService');
export const KEYBOARD_SERVICE = new InjectionToken<KeyboardsService>('KeyboardsService');

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
    { provide: MOTHERBOARD_SERVICE, useExisting: MotherboardsService },
    { provide: CASE_SERVICE, useExisting: CasesService},
    { provide: KEYBOARD_SERVICE, useExisting: KeyboardsService},
  ]
})
export class ComputerFormComponent {

  computer:Computer= new Computer();
  system!:OperationalSystem;
  cpu!:Processor;
  motherboard!:Motherboard;
  case!:Case;
  keyboard!:Keyboard;

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
  columnsMotherboard: TableColumn<Motherboard>[] = [
    { value: 'id', label: '#' },
    { value: 'manufacturer', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'cpuType', label: 'Socket' },
    { value: 'memoryType', label: 'Memoria' },
    { value: 'inUse', label: 'Em uso' },
  ];
  columnsCase: TableColumn<Case>[] = [
    { value: 'id', label: '#' },
    { value: 'color', label: 'Cor' },
    { value: 'numberOfBays', label: 'Número de Baias' },
    { value: 'hasDVD', label: 'DVD' },
    { value: 'inUse', label: 'Em uso' },
  ];
  columnsKeyboard: TableColumn<Keyboard>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'connectionType', label: 'Tipo de conexão' },
    { value: 'inUse', label: 'Em uso' },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private computersService: ComputersService,
    public requestService: RequestService,
    @Inject(OS_SERVICE) public osService: OperationalSystemsService,
    @Inject(CPU_SERVICE) public cpuService: ProcessorsService,
    @Inject(MOTHERBOARD_SERVICE) public motherboardsService: MotherboardsService,
    @Inject(CASE_SERVICE) public casesService: CasesService,
    @Inject(KEYBOARD_SERVICE) public keyboardsService: KeyboardsService,
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
    if (item.has("Placa-Mãe")) {
      this.motherboard = item.get("Placa-Mãe");
      console.log("MOTHERBOARD: ", this.motherboard);
    }
    if (item.has("Gabinete")) {
      this.case = item.get("Gabinete");
      console.log("Gabinete: ", this.case);
    }
    if (item.has("Teclado")) {
      this.keyboard = item.get("Teclado");
      console.log("Teclado: ", this.keyboard);
    }


  }
}
