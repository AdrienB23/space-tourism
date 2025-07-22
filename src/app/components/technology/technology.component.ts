import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, ParamMap, ROUTER_OUTLET_DATA} from '@angular/router';
import {PageData} from '../../shared/models/page-data';

@Component({
  selector: 'app-technology',
  standalone: false,
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss'
})
export class TechnologyComponent implements OnInit {
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{texts: { [key: string]: any }, data: PageData, screenWidth: number}>;
  data!: PageData;
  texts!: { [key: string]: any };
  screenWidth!: number;
  selectedTech = 0;

  constructor(
    private route: ActivatedRoute
  ) {
    effect(() => {
      const value = this.injections();
      if (value?.texts && value?.data && value?.screenWidth) {
        this.texts = value.texts;
        this.data = value.data;
        this.screenWidth = value.screenWidth;
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const techParam = params.get('tech');
      if (techParam !== null) {
        this.selectedTech = +techParam;
      }
    });
  }
}
