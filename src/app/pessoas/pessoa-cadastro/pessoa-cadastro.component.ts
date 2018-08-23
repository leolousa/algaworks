import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  titulo = '';

  constructor(
    private pessoaService: PessoaService,
    private mensagem: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo']; // Mostra o parâmetro enviado na rota

    // Verifica se está editando a pessoa
    if (codigoPessoa) {
      this.titulo = 'Editar Pessoa';
      this.carregarPessoa(codigoPessoa);
    } else {
      this.titulo = 'Nova Pessoa';
    }
    this.title.setTitle(this.titulo);
  }

   // Verifica se está editando
   get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.mensagem.add({
          severity: 'success',
          summary: `Pessoa adicionada com sucesso!`,
          detail: ``});
          // Direciona para outra view (navegação imperativa)
          this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
          // Comentado para fazer o exemplo de navegação imperativa
          // form.reset();
          // this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pes => {
      this.pessoa = pes;
      this.mensagem.add({
        severity: 'success',
        summary: `Pessoa alterada com sucesso!`,
        detail: ``});
        this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    // JAVASCRIPT: setTimeout utilizado para corrigir a perda do estado do formulário, as propriedades ficam nulas
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }
}
