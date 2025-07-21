import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, ParamMap, ROUTER_OUTLET_DATA} from '@angular/router';
import {ContentService} from '../../shared/services/content.service';
import {Destination} from '../../shared/models/destination';

@Component({
  selector: 'app-destination',
  standalone: false,
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.scss'
})
export class DestinationComponent implements OnInit{
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{texts: { [key: string]: any }, screenWidth: number}>;
  data!: Destination[];
  texts!: { [key: string]: any };
  selectedDestination = 0;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {
    effect(() => {
      const value = this.injections();
      if (value?.texts) {
        this.texts = value.texts;
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
    this.contentService.getDestinations().subscribe({
      next: data => {
        this.data = data;
        console.log('Destinations :', this.data);
      },
      error: err => {
        console.error('Erreur chargement destinations :', err);
      }
    });
  }
}
