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
    path: 'inventory/processors',
    component: ProcessorsPageComponent,
    resolve:{processors:ProcessorsResolver},
  },
  {
    path: 'inventory/processors/new',
    component: ProcessorFormComponent,
    resolve: {processor:ProcessorResolver},
  },
  {
    path: 'inventory/processors/:id/edit',
    component: ProcessorFormComponent,
    resolve: {processor:ProcessorResolver},
  },
];
