import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';

import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from '../../../node_modules/primeng/message';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    MessagesModule,
    MessageModule,
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ]
})
export class LancamentosModule { }
