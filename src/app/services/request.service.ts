import { Injectable } from '@angular/core';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  isLoading: boolean = false;

  sucessoAlert: {
    mensagem: string,
    exibir: boolean
  } = {
    mensagem: '',
    exibir: false
  };

  errorAlert: {
    show: boolean,
    error: string,
    message: string,
    status: number
  } = {
    show: false,
    error: '',
    message: '',
    status: 0
  };

  constructor() { }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }

  trataSucesso(response: RequestResponse){
    this.hideLoading()
    this.sucessoAlert.exibir = true;
    this.sucessoAlert.mensagem= response.message
  }

  trataErro(erro:any){
    let messageText= erro.error?.mensagem || erro.error?.message || 'o backend não está respondendo. Contate o suporte!';
    let errorText= erro.error?.erro || erro.headers?.name || 'Erro na solicitação';

    this.hideLoading()

    this.errorAlert.show = true;
    this.errorAlert.error = errorText;
    this.errorAlert.message = messageText;
    this.errorAlert.status = erro.status ? erro.status : 'Status desconhecido';
  }

}
