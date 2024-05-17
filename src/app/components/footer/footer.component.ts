import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Obtém o elemento onde o ano será exibido
    const yearElement = document.getElementById('year');

    // Obtém o ano atual
    const currentYear = new Date().getFullYear();

    // Define o ano atual no elemento HTML
    if (yearElement) {
      yearElement.textContent = currentYear.toString();
    }
  }
}
