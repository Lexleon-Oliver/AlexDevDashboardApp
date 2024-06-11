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
    const messageText = erro.error?.mensagem || erro.error?.message || 'Erro interno no servidor. Contate o suporte!';
    const errorText = erro.error?.erro || erro.headers?.name || 'Erro na solicitação';

    this.hideLoading()

    this.errorAlert = {
      show: true,
      error: errorText,
      message: messageText,
      status: erro.status || 500
    };
    console.log("Erro: ", erro)
    console.log("Erro Alert: ", this.errorAlert)
  }

}
