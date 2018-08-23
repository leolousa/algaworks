import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';


const rotas: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pessoas/:codigo', component: PessoaCadastroComponent }
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
export class PessoasRoutingModule { }
