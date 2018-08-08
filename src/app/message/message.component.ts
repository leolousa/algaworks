import { Component, Input } from '@angular/core';
import { FormControl } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="ui-message ui-messages-error ui-messages-info">
      {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      font-size: 13px;
      border: 0;
      margin: 0;
      margin-top: 4px;
      color: red;
    }
  `]
})
export class MessageComponent {

  // propriedades do componente
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro() {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
