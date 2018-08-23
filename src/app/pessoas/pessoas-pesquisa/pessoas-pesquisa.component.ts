import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaFiltro, PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro ();
  loading: Boolean = true;
  pessoas = [];
  @ViewChild('tabela') grid; // faz o bind com o objeto do componente tabela (p-table)

  constructor (private pessoaService: PessoaService,
    private confirmacao: ConfirmationService,
    private mensagem: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.itensPorPagina = event.rows; // Altera a exibição de linhas da tabela conforme escolhido pelo usuário
    const pagina = event.first / event.rows; // Define a página onde o usuário está
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {

    this.loading = true; // Mostra o ícone de loading na tabela
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
      this.loading = false;
      // Correção para a pesquisar forçar o retorno para a primeira página.
      if (pagina === 0) {
        this.grid.first = 0;
      }
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(pessoa: any) {
    this.confirmacao.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.exluir(pessoa.codigo)
      .then(() => {
        this.mensagem.add({
          severity: 'success',
          summary: `Pessoa excluída!`,
          detail: `${pessoa.nome}`});
        this.grid.first = 0; // Retorna para a primeira página da tabela da view
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // Método para alternar o status da pessoa diretamente na tabela
  alternarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.ativarDesativar(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;
        this.mensagem.add({
          severity: 'success',
          summary: `Pessoa ${acao} com sucesso!`,
          detail: ``});
        // this.grid.first = 0; // Retorna para a primeira página da tabela da view
        // this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
