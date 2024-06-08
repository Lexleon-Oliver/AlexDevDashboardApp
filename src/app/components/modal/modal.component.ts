import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit {

  constructor(
    public requestService: RequestService
  ) { }

  ngAfterViewInit() {
    this.openModal();
  }

  openModal() {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
  }

  closeModal() {
    this.requestService.errorAlert.show = false;
  }
}
