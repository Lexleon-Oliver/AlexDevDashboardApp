import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';

declare var bootstrap: any;

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent implements AfterViewInit {

  id: string = '';
  title: string = '';
  content: string = '';

  constructor(
    public requestService: RequestService,
  ) {
    this.id= 'errorModal';
    this.title= requestService.errorAlert.error;
    this.content= "Status: "+requestService.errorAlert.status+", "+requestService.errorAlert.message;
  }

  ngAfterViewInit() {
    this.openModal();
  }

  openModal() {
    var myModal = new bootstrap.Modal(document.getElementById(this.id));
    if (myModal) {
      myModal.show();

    }
  }

  closeModal() {
    this.requestService.errorAlert.show = false;
  }
}
