import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const rotas: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas)
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: []
})
export class LancamentosRoutingModule { }
