import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectNameservers,
  selectSuccessMsg,
  NameserverActions
} from './+state';
import { CommonModule } from '@angular/common';
import {
  AddNameServerComponent,
  DisplayTableComponent,
  HeaderComponent
} from './ui';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    AddNameServerComponent,
    DisplayTableComponent,
    HeaderComponent
  ],
  selector: 'ntt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly #store = inject(Store);
  readonly nameservers$ = this.#store.select(selectNameservers);
  readonly successMsg$ = this.#store.select(selectSuccessMsg);
  readonly errorMsg$ = this.#store.select(selectError);

  constructor() {
    this.#store.dispatch(NameserverActions.loadNameservers());
  }

  onAddNameserver(nameservers: string[]) {
    if (nameservers.length > 10) {
      const error =
        'You can only add a maximum of 10 nameservers for UK domains.';
      this.#store.dispatch(NameserverActions.addNameserverFailure({ error }));
      return;
    }

    nameservers.forEach((nameserver: string) => {
      const [name, ipAddress] = nameserver.split(': ');
      this.#store.dispatch(
        NameserverActions.addNameserver({ nameserver: { name, ipAddress } })
      );
    });
  }

  onResetMessage() {
    this.#store.dispatch(NameserverActions.resetMessage());
  }
}
