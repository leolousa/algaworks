import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriasService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private mensagem: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregaPessoas();
  }

  carregarCategorias() {
    return this.categoriasService.listaTodas()
      .then(categorias => {
        // Devemos transformar o array de categorias
        // que tem 'codigo' e 'nome' para o tipo do PrimeNG que tem 'label' e 'value'
        // o map itera sobre o array e retorna um objeto de outro tipo
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregaPessoas() {
    return this.pessoasService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.codigo };
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.mensagem.add({
          severity: 'success',
          summary: `Lançamento adicionado com sucesso!`,
          detail: ``});
          form.reset();
          this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
