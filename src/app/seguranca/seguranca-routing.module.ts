import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';


const rotas: Routes = [
  { path: 'login', component: LoginFormComponent }
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
export class SegurancaRoutingModule { }
