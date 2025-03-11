import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {

  @Input() pageTitle!: {
    titulo: string;
    itemMenu: string;
    itemSubmenu: string;
    alignment:'left' | 'right' | 'center' ;
    homeIcon: boolean;
    homeText: string;
  } ;
  @Input()
  divisor!:string

  // Define os divisores aceitos
  divisoresAceitos: string[] = ["'/'", "'>'", "'|'", "'-'", "'•'", "':'", "''"];

  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['home']);
  }

  getAlignmentClass(): string {
    switch (this.pageTitle.alignment){
      case "center": return "d-flex justify-content-center";
      case "right": return "d-flex justify-content-end";
      default : return "";
    }
  }


  ngOnInit() {
    if (!this.divisoresAceitos.includes(this.divisor)) {
      this.divisor = "'/'"; // Divisor padrão caso o valor passado não seja suportado
    }
  }
}
