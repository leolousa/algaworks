import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerService {

  constructor(private mensagem: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
        let errors;
        msg = 'Ocorreu um erro ao processar sua solicitação!';
        try {
          errors = errorResponse.json();
          msg = errors[0].mensagemUsuario;
        } catch (e) {}
        console.log('Ocorreu um erro', errorResponse);
      } else {
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
        console.error('Ocorreu um erro', errorResponse);
      }

    this.mensagem.add({
      severity: 'danger',
      summary: `Ops! Aconteceu um erro inexperado...`,
      detail: msg});
  }
}
