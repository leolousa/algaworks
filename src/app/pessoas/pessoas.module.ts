import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

import { SharedModule } from './../shared/shared.module';
import { PessoasRoutingModule } from './pessoa-routing.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

import { CampoColoridoDirective } from './../campo-colorido.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    MessageModule,
    PessoasRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent,
    CampoColoridoDirective
  ],
  exports: []
})
export class PessoasModule { }
