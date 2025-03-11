import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SectionPageComponent } from '../section-page/section-page.component';
import { RequestService } from '../../services/request.service';
import { LoadingComponent } from '../loading/loading.component';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    PageTitleComponent,
    SectionPageComponent,
    LoadingComponent,
    SuccessAlertComponent,
    ErrorModalComponent
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent {

  @Input() divisor:string = '';
  @Input() pageTitle: any;
  @Input() columnClass: string = 'col-lg-12';

  constructor(
    public requestService: RequestService
  ){}

}
