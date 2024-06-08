import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataHoraService {

  constructor() { }

  formatarDataHoraAtual() {
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Os meses começam em 0, então adicionamos 1.
    const ano = dataAtual.getFullYear();

    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

    const dataHoraFormatada = `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;

    return dataHoraFormatada;
  }
}
