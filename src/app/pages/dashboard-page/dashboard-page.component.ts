import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    PageLayoutComponent,
    ModalComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
