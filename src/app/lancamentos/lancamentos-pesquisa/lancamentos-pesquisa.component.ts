import { Component, OnInit, ViewChild } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { LazyLoadEvent } from 'primeng/components/common/api';

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
  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
  }

  aoMudarPagina(event: LazyLoadEvent) {
    // Mostra o ícone de loading na tabela
    this.loading = true;
    // Altera a exibição de linhas da tabela conforme escolhido pelo usuário
    this.filtro.itensPorPagina = event.rows;
    // Define a página onde o usuário está
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
        this.loading = false;
      });
  }

  excluir(lancamento: any) {
    this.lancamentoService.exluir(lancamento.codigo)
      .then(() => {
        this.grid.first = 0; // Retorna para a primeira página d tabela da view
      });
  }

}
