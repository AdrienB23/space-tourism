import {Component, effect, inject, Signal} from '@angular/core';
import {ContentData} from '../../shared/models/content-data';
import {ContentText} from '../../shared/models/content-text';
import {ROUTER_OUTLET_DATA} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{data: ContentData, text: ContentText, screenWidth: number}>;
  data!: ContentData;
  text!: ContentText;

  constructor() {
    effect(() => {
      const value = this.injections();
      if (value?.text && value?.data) {
        this.text = value.text;
        this.data = value.data;
      }
    });
  }
}
