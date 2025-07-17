import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, ParamMap, ROUTER_OUTLET_DATA} from '@angular/router';
import {ContentData} from '../../shared/models/content-data';
import {ContentText} from '../../shared/models/content-text';

@Component({
  selector: 'app-crew',
  standalone: false,
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{data: ContentData, text: ContentText, screenWidth: number}>;
  data!: ContentData;
  text!: ContentText;
  selectedCrew = 0;

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
      const crewParam = params.get('crew');
      if (crewParam !== null) {
        this.selectedCrew = +crewParam;
      }
    });
  }
}
