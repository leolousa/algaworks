import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Lancamento } from '../core/model';

// Classe utilizada para repreentar o filtro na página de pesquisa lançamentos
export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  // Método de pesquisa do serviço
  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const cabecalho = new Headers();

    cabecalho.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo` , { headers: cabecalho, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;
        const resultado = {
          lancamentos: lancamentos,
          total: responseJson.totalElements
        };
        return resultado;
      });
  }

  exluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response.json() as Lancamento);
  }

  // Atualiza os dados do Lancamento
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamentoAlterado]);
        return lancamentoAlterado;
      });
  }

  // Busca o Lancamento pelo codigo
  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}/${codigo}` , { headers })
    .toPromise()
    .then(response => {
      const lancamento = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamento]);
      return lancamento;
    });
  }

  // Converte as strings do objeto Lancamento e Date para o componente DatePicker do primeNG
  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
