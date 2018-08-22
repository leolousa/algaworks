import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa, Endereco } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private mensagem: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.mensagem.add({
          severity: 'success',
          summary: `Pessoa adicionada com sucesso!`,
          detail: ``});
          form.reset();
          this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
