import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, ParamMap, ROUTER_OUTLET_DATA} from '@angular/router';
import {PageData} from '../../shared/models/page-data';

@Component({
  selector: 'app-destination',
  standalone: false,
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.scss'
})
export class DestinationComponent implements OnInit{
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{texts: { [key: string]: any }, data: PageData}>;
  data!: PageData;
  texts!: { [key: string]: any };
  selectedDestination = 0;

  constructor(
    private route: ActivatedRoute
  ) {
    effect(() => {
      const value = this.injections();
      if (value?.texts && value?.data) {
        this.texts = value.texts;
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
