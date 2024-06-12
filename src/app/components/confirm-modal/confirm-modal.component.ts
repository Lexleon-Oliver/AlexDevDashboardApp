import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent implements OnInit {
  @Input()
  modal!: { id: string; title: string; text: string; cancelText: string; cancelClass: string; confirmText: string; confirmClass: string; };
  @Output() confirmacaoAcao: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {

  }

  confirmarAcao() {
    this.confirmacaoAcao.emit();
    // Feche o modal após a ação ser confirmada
    this.modalService.closeModal(this.modal.id);
  }

  fecharModal() {
    this.modalService.closeModal(this.modal.id);
  }



}
