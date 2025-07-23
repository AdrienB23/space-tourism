import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, ParamMap, ROUTER_OUTLET_DATA} from '@angular/router';
import {PageData} from '../../shared/models/page-data';

@Component({
  selector: 'app-crew',
  standalone: false,
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{texts: { [key: string]: any }, data: PageData}>;
  data!: PageData;
  texts!: { [key: string]: any };
  selectedCrew = 0;

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
      const crewParam = params.get('crew');
      if (crewParam !== null) {
        this.selectedCrew = +crewParam;
      }
    });
  }
}
