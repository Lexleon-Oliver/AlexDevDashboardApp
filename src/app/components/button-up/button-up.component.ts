import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-up',
  standalone: true,
  imports: [],
  templateUrl: './button-up.component.html',
  styleUrl: './button-up.component.scss'
})
export class ButtonUpComponent implements OnInit {

  scrolledDown = false;

  constructor() { }

  ngOnInit() { }

  @HostListener('window:scroll', [])

  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.scrolledDown = true;
    } else {
      this.scrolledDown = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
