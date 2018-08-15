import { Component, OnInit } from '@angular/core';

import { PessoaFiltro, PessoaService } from './../pessoa.service';

import { LazyLoadEvent } from 'primeng/components/common/api';

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

  constructor (private pessoaService: PessoaService) {}

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
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
        this.loading = false;
      });
  }
}
