import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  titulo = '';

  constructor(
    private categoriasService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private mensagem: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoLancamento = this.route.snapshot.params['codigo']; // Mostra o parâmetro enviado na rota

    // Verifica se está editando o lancamento
    if (codigoLancamento) {
      this.titulo = 'Editar Lançamento';
      this.carregarLancamento(codigoLancamento);
    } else {
      this.titulo = 'Novo Lançamento';
    }
    this.title.setTitle(this.titulo);

    this.carregarCategorias();
    this.carregaPessoas();
  }

  // Verifica se está editando
  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
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
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.mensagem.add({
          severity: 'success',
          summary: `Lançamento adicionado com sucesso!`,
          detail: ``});
          // Direciona para outra view (navegação imperativa)
          this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
          // Comentado para fazer o exemplo de navegação imperativa
          // form.reset();
          // this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.mensagem.add({
        severity: 'success',
        summary: `Lançamento alterado com sucesso!`,
        detail: ``});
        this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    // JAVASCRIPT: setTimeout utilizado para corrigir a perda do estado do formulário, as propriedades ficam nulas
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Lançamento: ${this.lancamento.descricao}`);
  }
}
