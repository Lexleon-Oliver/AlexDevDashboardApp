import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {

  constructor(
  ){}

  onHome() {
    window.location.reload();
  }

  toggleSidebar() {
    document.body.classList.toggle('toggle-sidebar');
  }

}
