import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { NavHeaderComponent } from '../nav-header/nav-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    NavHeaderComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
