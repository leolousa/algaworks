// Classe com toso os objetos modelos das entidades
// Pode ficar em uma pasta separada com um arquivo por classe

export class Pessoa {
  codigo: number;
  nome: string;
}

export class Categoria {
  codigo: number;
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
