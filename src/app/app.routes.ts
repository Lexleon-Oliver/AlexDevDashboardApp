import { PowerSupplyPageComponent } from './pages/power-supply-page/power-supply-page.component';
import { PowerSupplyResolver } from './resolvers/power-supply.resolver';
import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TasksResolver } from './resolvers/tasks.resolver';
import { TaskResolver } from './resolvers/task.resolver';
import { MotherboardsPageComponent } from './pages/motherboards-page/motherboards-page.component';
import { MotherboardsResolver } from './resolvers/motherboards.resolver';
import { MotherboardResolver } from './resolvers/motherboard.resolver';
import { MotherboardFormComponent } from './pages/motherboard-form/motherboard-form.component';
import { ProcessorsResolver } from './resolvers/processors.resolver';
import { ProcessorsPageComponent } from './pages/processors-page/processors-page.component';
import { ProcessorResolver } from './resolvers/processor.resolver';
import { ProcessorFormComponent } from './pages/processor-form/processor-form.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { MemoriesPageComponent } from './pages/memories-page/memories-page.component';
import { MemoriesResolver } from './resolvers/memories.resolver';
import { MemoryResolver } from './resolvers/memory.resolver';
import { MemoryFormComponent } from './pages/memory-form/memory-form.component';
import { PowerSuppliesResolver } from './resolvers/power-supplies.resolver';
import { PowerSupplyFormComponent } from './pages/power-supply-form/power-supply-form.component';
import { CasesPageComponent } from './pages/cases-page/cases-page.component';
import { CasesResolver } from './resolvers/cases.resolver';
import { CaseFormComponent } from './pages/case-form/case-form.component';
import { CaseResolver } from './resolvers/case.resolver';
import { HdResolver } from './resolvers/hd.resolver';
import { HdsResolver } from './resolvers/hds.resolver';
import { HdsPageComponent } from './pages/hds-page/hds-page.component';
import { HdFormComponent } from './pages/hd-form/hd-form.component';
import { KeyboardResolver } from './resolvers/keyboard.resolver';
import { KeyboardsResolver } from './resolvers/keyboards.resolver';
import { KeyboardsPageComponent } from './pages/keyboards-page/keyboards-page.component';
import { KeyboardFormComponent } from './pages/keyboard-form/keyboard-form.component';
import { MouseResolver } from './resolvers/mouse.resolver';
import { MousesResolver } from './resolvers/mouses.resolver';
import { MousesPageComponent } from './pages/mouses-page/mouses-page.component';
import { MouseFormComponent } from './pages/mouse-form/mouse-form.component';
import { NetworkcardsResolver } from './resolvers/networkcards.resolver';
import { NetworkcardsPageComponent } from './pages/networkcards-page/networkcards-page.component';
import { NetworkcardFormComponent } from './pages/networkcard-form/networkcard-form.component';
import { NetworkcardResolver } from './resolvers/networkcard.resolver';
import { GraphicsCardsPageComponent } from './pages/graphics-cards-page/graphics-cards-page.component';
import { GraphicscardsResolver } from './resolvers/graphicscards.resolver';
import { GraphicsCardFormComponent } from './pages/graphics-card-form/graphics-card-form.component';
import { GraphicscardResolver } from './resolvers/graphicscard.resolver';
import { MonitorsResolver } from './resolvers/monitors.resolver';
import { MonitorResolver } from './resolvers/monitor.resolver';
import { MonitorsPageComponent } from './pages/monitors-page/monitors-page.component';
import { MonitorFormComponent } from './pages/monitor-form/monitor-form.component';
import { SpeakerResolver } from './resolvers/speaker.resolver';
import { SpeakersResolver } from './resolvers/speakers.resolver';
import { SpeakersPageComponent } from './pages/speakers-page/speakers-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: DashboardPageComponent ,
  },
  {
    path: 'users/notifications',
    component: NotificationsPageComponent,
  },
  {
    path: 'users/profile',
    component: ProfilePageComponent,
  },
  {
    path: 'users/new',
    component: UserFormComponent,
  },
  {
    path: 'users/tasks',
    component: TasksPageComponent,
    resolve: {tasks:TasksResolver},
  },
  {
    path: 'users/tasks/new',
    component: TaskFormComponent,
    resolve: {task:TaskResolver}
  },
  {
    path: 'users/tasks/:id/edit',
    component: TaskFormComponent,
    resolve:{task:TaskResolver},
  },
  {
    path: 'inventory/motherboards',
    component: MotherboardsPageComponent,
    resolve:{motherboards:MotherboardsResolver},
  },
  {
    path: 'inventory/motherboards/new',
    component: MotherboardFormComponent,
    resolve: {motherboard:MotherboardResolver},
  },
  {
    path: 'inventory/motherboards/:id/edit',
    component: MotherboardFormComponent,
    resolve: {motherboard:MotherboardResolver},
  },
  {
    path: 'inventory/cpus',
    component: ProcessorsPageComponent,
    resolve:{processors:ProcessorsResolver},
  },
  {
    path: 'inventory/cpus/new',
    component: ProcessorFormComponent,
    resolve: {processor:ProcessorResolver},
  },
  {
    path: 'inventory/cpus/:id/edit',
    component: ProcessorFormComponent,
    resolve: {processor:ProcessorResolver},
  },
  {
    path: 'inventory/memories',
    component: MemoriesPageComponent,
    resolve:{memories:MemoriesResolver},
  },
  {
    path: 'inventory/memories/new',
    component: MemoryFormComponent,
    resolve: {memory:MemoryResolver},
  },
  {
    path: 'inventory/memories/:id/edit',
    component: MemoryFormComponent,
    resolve: {memory:MemoryResolver},
  },
  {
    path: 'inventory/powersupplies',
    component: PowerSupplyPageComponent,
    resolve:{powerSupplies:PowerSuppliesResolver},
  },
  {
    path: 'inventory/powersupplies/new',
    component: PowerSupplyFormComponent,
    resolve: {powerSupply:PowerSupplyResolver},
  },
  {
    path: 'inventory/powersupplies/:id/edit',
    component: PowerSupplyFormComponent,
    resolve: {powerSupply:PowerSupplyResolver},
  },
  {
    path: 'inventory/cases',
    component: CasesPageComponent,
    resolve:{cases:CasesResolver},
  },
  {
    path: 'inventory/cases/new',
    component: CaseFormComponent,
    resolve: {case:CaseResolver},
  },
  {
    path: 'inventory/cases/:id/edit',
    component: CaseFormComponent,
    resolve: {case:CaseResolver},
  },
  {
    path: 'inventory/hds',
    component: HdsPageComponent,
    resolve:{hds:HdsResolver},
  },
  {
    path: 'inventory/hds/new',
    component: HdFormComponent,
    resolve: {hd:HdResolver},
  },
  {
    path: 'inventory/hds/:id/edit',
    component: HdFormComponent,
    resolve: {hd:HdResolver},
  },
  {
    path: 'inventory/keyboards',
    component: KeyboardsPageComponent,
    resolve:{keyboards:KeyboardsResolver},
  },
  {
    path: 'inventory/keyboards/new',
    component: KeyboardFormComponent,
    resolve: {keyboard:KeyboardResolver},
  },
  {
    path: 'inventory/keyboards/:id/edit',
    component: KeyboardFormComponent,
    resolve: {keyboard:KeyboardResolver},
  },
  {
    path: 'inventory/mouses',
    component: MousesPageComponent,
    resolve:{mouses:MousesResolver},
  },
  {
    path: 'inventory/mouses/new',
    component: MouseFormComponent,
    resolve: {mouse:MouseResolver},
  },
  {
    path: 'inventory/mouses/:id/edit',
    component: MouseFormComponent,
    resolve: {mouse:MouseResolver},
  },
  {
    path: 'inventory/networkcards',
    component: NetworkcardsPageComponent,
    resolve:{networkcards:NetworkcardsResolver},
  },
  {
    path: 'inventory/networkcards/new',
    component: NetworkcardFormComponent,
    resolve: {networkcard:NetworkcardResolver},
  },
  {
    path: 'inventory/networkcards/:id/edit',
    component: NetworkcardFormComponent,
    resolve: {networkcard:NetworkcardResolver},
  },
  {
    path: 'inventory/graphicscards',
    component: GraphicsCardsPageComponent,
    resolve:{graphicscards:GraphicscardsResolver},
  },
  {
    path: 'inventory/graphicscards/new',
    component: GraphicsCardFormComponent,
    resolve: {graphicscard:GraphicscardResolver},
  },
  {
    path: 'inventory/graphicscards/:id/edit',
    component: GraphicsCardFormComponent,
    resolve: {graphicscard:GraphicscardResolver},
  },
  {
    path: 'inventory/monitors',
    component: MonitorsPageComponent,
    resolve:{monitors:MonitorsResolver},
  },
  {
    path: 'inventory/monitors/new',
    component: MonitorFormComponent,
    resolve: {monitor:MonitorResolver},
  },
  {
    path: 'inventory/monitors/:id/edit',
    component: MonitorFormComponent,
    resolve: {monitor:MonitorResolver},
  },
  {
    path: 'inventory/speakers',
    component: SpeakersPageComponent,
    resolve:{speakers:SpeakersResolver},
  },
  {
    path: 'inventory/speakers/new',
    component: MonitorFormComponent,
    resolve: {speaker:SpeakerResolver},
  },
  {
    path: 'inventory/speakers/:id/edit',
    component: MonitorFormComponent,
    resolve: {speaker:SpeakerResolver},
  },
];
