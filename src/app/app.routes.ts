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
];
