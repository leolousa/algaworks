import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]',
  exportAs: 'campoColorido'// Exporta a instância da Diretiva para expor sua API para outros usarem
})
export class CampoColoridoDirective {

  @Input()
  cor: String = 'gray';

  @HostBinding('style.backgroundColor')
  corDeFundo: String;

  @HostListener('focus')
  colorir() {
    this.corDeFundo = this.cor;
  }

  @HostListener('blur')
  descolorir() {
    this.corDeFundo = 'transparent';
  }

}
