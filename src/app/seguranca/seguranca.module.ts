import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { JwtModule } from '@auth0/angular-jwt';

import { LogoutService } from './logout.service';
import { environment } from '../../environments/environment';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AuthGuard } from './auth-guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    })
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
