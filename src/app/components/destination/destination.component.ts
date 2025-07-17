import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, ParamMap, ROUTER_OUTLET_DATA} from '@angular/router';
import {ContentData} from '../../shared/models/content-data';
import {ContentText} from '../../shared/models/content-text';

@Component({
  selector: 'app-destination',
  standalone: false,
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.scss'
})
export class DestinationComponent implements OnInit{
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{data: ContentData, text: ContentText, screenWidth: number}>;
  data!: ContentData;
  text!: ContentText;
  selectedDestination = 0;

  constructor(private route: ActivatedRoute) {
    effect(() => {
      const value = this.injections();
      if (value?.text && value?.data) {
        this.text = value.text;
        this.data = value.data;
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const destParam = params.get('dest');
      if (destParam !== null) {
        this.selectedDestination = +destParam;
      }
    });
  }
}
