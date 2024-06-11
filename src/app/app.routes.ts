import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TasksResolver } from './resolvers/tasks.resolver';
import { TaskResolver } from './resolvers/task.resolver';

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
    path: 'users/tasks',
    component: TasksPageComponent,
    resolve: {tasks:TasksResolver},

  },
  {
    path: 'users/tasks/new',
    component: TaskFormComponent,
    resolve: {task:TaskResolver}

  },
];
