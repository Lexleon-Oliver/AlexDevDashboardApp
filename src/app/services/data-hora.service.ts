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

    const dataHoraFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

    return dataHoraFormatada;
  }

  formatarData(dateOnForm: string): string {
    const [ano, mes, dia] = dateOnForm.split('-');
    const formattedExpirationDate =`${dia}/${mes}/${ano}`
    return formattedExpirationDate;
  }

  formatarDataForm(data: string): string {
    const partes = data.split('/');
    const ano = partes[2];
    const mes = partes[1].padStart(2, '0');
    const dia = partes[0].padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}
