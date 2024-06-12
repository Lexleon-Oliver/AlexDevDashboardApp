import { Injectable } from '@angular/core';
import { Modal } from 'bootstrap';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private openedModals: Map<string, Modal> = new Map<string, Modal>();
  private actionConfirmed: boolean = false;

  openModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
      this.openedModals.set(modalId, modalInstance);
    } else {
      console.error(`Modal with ID ${modalId} not found.`);
    }
  }

  getOpenedModal(modalId: string): Modal | undefined {
    return this.openedModals.get(modalId);
  }

  closeModal(modalId: string) {
    const modal = this.openedModals.get(modalId);
    if (modal) {
      modal.hide();
      this.openedModals.delete(modalId);
    } else {
      console.error(`Modal with ID ${modalId} not found.`);
    }
  }

  confirmAction(){
    this.actionConfirmed=true;
  }

  isConfirmedAction():boolean{
    return this.actionConfirmed;
  }

  cancelAction(){
    this.actionConfirmed=false;
  }
}
