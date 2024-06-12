import { Component, Input } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { PageTitleComponent } from '../page-title/page-title.component';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';
import { SectionPageNocolumnComponent } from '../section-page-nocolumn/section-page-nocolumn.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-page-layout-nocolumn',
  standalone: true,
  imports: [
    PageTitleComponent,
    LoadingComponent,
    SuccessAlertComponent,
    ErrorModalComponent,
    SectionPageNocolumnComponent,
  ],
  templateUrl: './page-layout-nocolumn.component.html',
  styleUrl: './page-layout-nocolumn.component.scss'
})
export class PageLayoutNocolumnComponent {

  @Input() divisor:string = '';
  @Input() pageTitle: any;
  constructor(
    public requestService: RequestService

  ) { }
}
