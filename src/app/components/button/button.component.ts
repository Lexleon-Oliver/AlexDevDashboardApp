import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  @Input()
  text!:string
  @Input()
  icon!:string
  @Input()
  corBotao!:string
  @Input()
  tipoBotao!:string
  @Input()
  tamanhoBotao!:string
  @Input()
  arredondado:boolean =false;
  @Input()
  metodoAChamar: Function | undefined;
  @Input() disabled: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }


  chamarMetodo() {
    if (this.metodoAChamar && typeof this.metodoAChamar === 'function') {
      this.metodoAChamar();
    }
  }

  getButtonClasses(): { [key: string]: boolean } {
    if(this.tipoBotao === 'default'){
      return {
        'btn-primary': this.corBotao === 'primary',
        'btn-secondary': this.corBotao === 'secondary',
        'btn-danger': this.corBotao === 'danger',
        'btn-info': this.corBotao === 'info',
        'btn-light': this.corBotao === 'light',
        'btn-dark': this.corBotao === 'dark',
        'btn-success': this.corBotao === 'success',
        'btn-warning': this.corBotao === 'warning',
        'btn-link': this.corBotao === 'link',
        'rounded-pill': this.arredondado,
        'btn-sm': this.tamanhoBotao === 'small',
        'btn-lg': this.tamanhoBotao === 'large',
      };
    }else{
      return{
        'btn-outline-primary': this.corBotao === 'primary',
        'btn-outline-secondary': this.corBotao === 'secondary',
        'btn-outline-danger': this.corBotao === 'danger',
        'btn-outline-info': this.corBotao === 'info',
        'btn-outline-light': this.corBotao === 'light',
        'btn-outline-dark': this.corBotao === 'dark',
        'btn-outline-success': this.corBotao === 'success',
        'btn-outline-warning': this.corBotao === 'warning',
        'btn-outline-link': this.corBotao === 'link',
        'text-dark': this.corBotao==='light',
        'rounded-pill': this.arredondado,
        'btn-sm': this.tamanhoBotao === 'small',
        'btn-lg': this.tamanhoBotao === 'large',
      }
    }
  }
}
