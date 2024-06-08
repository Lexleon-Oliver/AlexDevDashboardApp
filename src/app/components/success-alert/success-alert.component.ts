import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-success-alert',
  standalone: true,
  imports: [],
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.scss'
})
export class SuccessAlertComponent implements OnInit{
  constructor(
    public requestService:RequestService
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.fecharAlerta();
    }, 3000);
  }


  fecharAlerta(){
    this.requestService.sucessoAlert.exibir = false
  }

}
