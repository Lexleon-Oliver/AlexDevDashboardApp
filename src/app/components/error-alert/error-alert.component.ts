import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss'
})
export class ErrorAlertComponent implements OnInit {
  constructor(
    public requestService: RequestService
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.closeAlert();
    }, 5000);
  }

  closeAlert() {
    this.requestService.errorAlert.show = false;
  }
}
