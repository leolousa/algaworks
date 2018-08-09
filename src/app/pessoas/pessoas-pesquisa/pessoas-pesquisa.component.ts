import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  pessoas = [
    { nome: 'Leonardo Baiocchi', cidade: 'Brasília', estado: 'DF', status: true },
    { nome: 'Jose da Silva', cidade: 'São Paulo', estado: 'SP', status: false },
    { nome: 'Maria das Dores', cidade: 'Goiânia', estado: 'GO', status: false },
    { nome: 'Carla Alves', cidade: 'Rio Verde', estado: 'GO', status: true },
    { nome: 'Pedro Pereira', cidade: 'Rio de Janeiro', estado: 'RJ', status: false },
    { nome: 'Enzo José', cidade: 'Santos', estado: 'SP', status: true },
    { nome: 'Patrícia Silva', cidade: 'Curitiba', estado: 'PR', status: true },
  ];

}
