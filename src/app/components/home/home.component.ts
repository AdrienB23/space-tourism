import {Component, effect, inject, Signal} from '@angular/core';
import {ROUTER_OUTLET_DATA} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{texts: { [key: string]: any }}>;
  texts!: { [key: string]: any };

  constructor() {
    effect(() => {
      const value = this.injections();
      if (value?.texts) {
        this.texts = value.texts;
      }
    });
  }
}
