import { Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'; // Para Angular6 devemos registrar o locale

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { AuthService } from '../seguranca/auth.service';
import { MoneyHttp } from './../seguranca/money-http';
import { CategoriaService } from './../categorias/categoria.service';
import { RelatoriosService } from './../relatorios/relatorios.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastModule,
    RouterModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    ConfirmationService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    DashboardService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ErrorHandlerService,
    Title,
    AuthService,
    RelatoriosService,
    MessageService,
    MoneyHttp,
    JwtHelperService

  ]
})

export class CoreModule { }
