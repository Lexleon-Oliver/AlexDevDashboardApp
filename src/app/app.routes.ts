import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';

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

  },
];
