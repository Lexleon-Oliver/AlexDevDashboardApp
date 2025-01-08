import { NetworkcardsService } from './../../services/networkcards.service';
import { GraphicscardsService } from './../../services/graphicscards.service';
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
import { MousesService } from '../../services/mouses.service';
import { Mouse } from '../../models/mouse';
import { PowerSuppliesService } from '../../services/power-supplies.service';
import { PowerSupply } from '../../models/power-supply';
import { SpeakersService } from '../../services/speakers.service';
import { Speaker } from '../../models/speaker';
import { GraphicsCard } from '../../models/graphics-card';
import { NetworkCard } from '../../models/networkcard';
import { InputFormDisabledComponent } from '../../components/input-form-disabled/input-form-disabled.component';
import { SectionPageNocolumnComponent } from '../../components/section-page-nocolumn/section-page-nocolumn.component';
import { Memory } from '../../models/memory';
import { MemoriesService } from '../../services/memories.service';
import { ButtonComponent } from '../../components/button/button.component';

export const OS_SERVICE = new InjectionToken<OperationalSystemsService>('OperationalSystemsService');
export const CPU_SERVICE = new InjectionToken<ProcessorsService>('ProcessorsService');
export const MEMORY_SERVICE = new InjectionToken<MemoriesService>('MemoriesService');
export const MOTHERBOARD_SERVICE = new InjectionToken<MotherboardsService>('MotherboardsService');
export const CASE_SERVICE = new InjectionToken<CasesService>('CasesService');
export const KEYBOARD_SERVICE = new InjectionToken<KeyboardsService>('KeyboardsService');
export const MOUSE_SERVICE = new InjectionToken<MousesService>('MousesService');
export const POWERSUPPLY_SERVICE = new InjectionToken<PowerSuppliesService>('PowerSuppliesService');
export const SPEAKER_SERVICE = new InjectionToken<SpeakersService>('SpeakersService');
export const GRAPHICSCARD_SERVICE = new InjectionToken<GraphicscardsService>('GraphicscardsService');
export const NETWORKCARD_SERVICE = new InjectionToken<NetworkcardsService>('NetworkcardsService');

@Component({
  selector: 'app-computer-form',
  standalone: true,
  imports: [
    PageLayoutComponent,
    SimpleCardComponent,
    FormComponent,
    InputFormComponent,
    GenericListTableComponent,
    InputFormDisabledComponent,
    SectionPageNocolumnComponent,
    ButtonComponent

],
  templateUrl: './computer-form.component.html',
  styleUrl: './computer-form.component.scss',
  providers: [
    { provide: OS_SERVICE, useExisting: OperationalSystemsService },
    { provide: CPU_SERVICE, useExisting: ProcessorsService },
    { provide: MEMORY_SERVICE, useExisting: MemoriesService },
    { provide: MOTHERBOARD_SERVICE, useExisting: MotherboardsService },
    { provide: CASE_SERVICE, useExisting: CasesService},
    { provide: KEYBOARD_SERVICE, useExisting: KeyboardsService},
    { provide: MOUSE_SERVICE, useExisting: MousesService},
    { provide: POWERSUPPLY_SERVICE, useExisting: PowerSuppliesService},
    { provide: SPEAKER_SERVICE, useExisting: SpeakersService},
    { provide: GRAPHICSCARD_SERVICE, useExisting: GraphicscardsService},
    { provide: NETWORKCARD_SERVICE, useExisting: NetworkcardsService},
  ]
})
export class ComputerFormComponent {

  computer:Computer= new Computer();
  system!:OperationalSystem;
  cpu!:Processor;
  motherboard!:Motherboard;
  case!:Case;
  keyboard!:Keyboard;
  mouse!:Mouse;
  powerSupply!:PowerSupply;
  speaker!: Speaker;
  graphicsCard!: GraphicsCard;
  networkCard!:NetworkCard;
  memories:Memory[] =[];

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
  columnsMemory: TableColumn<Memory>[] = [
    { value: 'id', label: '#' },
    { value: 'capacity', label: 'Capacidade' },
    { value: 'type', label: 'Tipo' },
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
  columnsMouse: TableColumn<Mouse>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'connectionType', label: 'Tipo de conexão' },
    { value: 'inUse', label: 'Em uso' },
  ];
  columnsPowerSupply: TableColumn<PowerSupply>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'power', label: 'Potência' },
    { value: 'inputVoltage', label: 'Alimentação' },
    { value: 'inUse', label: 'Em uso' },
  ];
  columnsSpeaker: TableColumn<Speaker>[] = [
    { value: 'id', label: '#' },
    { value: 'model', label: 'Modelo' },
    { value: 'inUse', label: 'Em uso' },
  ];
  columnsGraphicsCard: TableColumn<GraphicsCard>[] = [
    { value: 'id', label: '#' },
    { value: 'brand', label: 'Marca' },
    { value: 'model', label: 'Modelo' },
    { value: 'capacity', label: 'Capacidade' },
    { value: 'graphicsConnectionsTypes', label: 'Conexões' },
    { value: 'inUse', label: 'Em uso' },
  ];
  columnsNetwork: TableColumn<NetworkCard>[] = [
    { value: 'id', label: '#' },
    { value: 'brand', label: 'Fabricante' },
    { value: 'model', label: 'Modelo' },
    { value: 'macAddress', label: 'MAC' },
    { value: 'transferRate', label: 'Taxa Transferência' },
    { value: 'inUse', label: 'Em uso' },
  ];

  addNewMemory: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    private computersService: ComputersService,
    public requestService: RequestService,
    @Inject(OS_SERVICE) public osService: OperationalSystemsService,
    @Inject(CPU_SERVICE) public cpuService: ProcessorsService,
    @Inject(MEMORY_SERVICE) public memoryService: MemoriesService,
    @Inject(MOTHERBOARD_SERVICE) public motherboardsService: MotherboardsService,
    @Inject(CASE_SERVICE) public casesService: CasesService,
    @Inject(KEYBOARD_SERVICE) public keyboardsService: KeyboardsService,
    @Inject(MOUSE_SERVICE) public mousesService: KeyboardsService,
    @Inject(POWERSUPPLY_SERVICE) public powerSuppliesService: PowerSuppliesService,
    @Inject(SPEAKER_SERVICE) public speakersService: SpeakersService,
    @Inject(GRAPHICSCARD_SERVICE) public graphicsCardsService: GraphicscardsService,
    @Inject(NETWORKCARD_SERVICE) public networksCardsService: NetworkcardsService,
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
    formData.name = formData.name.toUpperCase();

    Object.assign(this.computer, formData);
    let itemData = new Computer(this.computer);
    // this.computersService.save(itemData).subscribe({
    //   next:(res:any)=>{
    //     this.requestService.hideLoading()
    //     this.requestService.trataSucesso(res)
    //     setTimeout(() => {
    //       this.onCancel();
    //     }, 3000);
    //   },
    //   error: (error)=>{
    //     this.requestService.hideLoading()
    //     this.requestService.trataErro(error );
    //   }
    // });
    console.log("Computers saved: " + JSON.stringify(itemData));

  }

  onItemSelected(item: Map<string, any>) {

    const mappings: { [key: string]: (value: any) => void } = {
      "Sistema Operacional": (value: any) => { this.system = value; },
      "CPU": (value: any) => { this.cpu = value; },
      "Placa-Mãe": (value: any) => { this.motherboard = value; },
      "Gabinete": (value: any) => { this.case = value; },
      "Teclado": (value: any) => { this.keyboard = value; },
      "Mouse": (value: any) => { this.mouse = value; },
      "Fonte": (value: any) => { this.powerSupply = value; },
      "Caixa de som": (value: any) => { this.speaker = value; },
      "Placa de vídeo": (value: any) => { this.speaker = value; },
      "Placa de rede": (value: any) => { this.networkCard = value; },
      "Memória": (value: any) => {
      if (this.memories) {
        const index = this.memories.findIndex(memory => memory.id === value.id);  // Supondo que cada memória tenha um ID único
        if (index === -1) {
          this.memories.push(value);
        } else {
          this.memories[index] = value;
        }
        this.addNewMemory = false;
      }
    }
  };

    for (const [key, setter] of Object.entries(mappings)) {
      if (item.has(key)) {
        setter(item.get(key));
        console.log(`${key}: `, item.get(key));
      }
    }
  }

  onAddNewMemory(){
    this.addNewMemory = true;
  }


}
