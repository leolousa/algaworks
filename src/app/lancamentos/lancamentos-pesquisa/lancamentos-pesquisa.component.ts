import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  loading: Boolean = true;
  @ViewChild('tabela') grid; // faz o bind com o objeto do componente tabela (p-table)

  constructor(
    private auth: AuthService,
    private lancamentoService: LancamentoService,
    private confirmacao: ConfirmationService,
    private mensagem: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.itensPorPagina = event.rows; // Altera a exibição de linhas da tabela conforme escolhido pelo usuário
    const pagina = event.first / event.rows; // Define a página onde o usuário está
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.loading = true; // Mostra o ícone de loading na tabela
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
      this.loading = false;
      // Correção para a pesquisar forçar o retorno para a primeira página.
      if (pagina === 0) {
        this.grid.first = 0;
      }
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(lancamento: any) {
    this.confirmacao.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.mensagem.add({
          severity: 'success',
          summary: `Lançamento excluído!`,
          detail: `${lancamento.descricao}`});
        this.grid.first = 0; // Retorna para a primeira página da tabela da view
        this.pesquisar();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
