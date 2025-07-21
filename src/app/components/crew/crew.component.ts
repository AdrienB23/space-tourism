import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {ActivatedRoute, ParamMap, ROUTER_OUTLET_DATA} from '@angular/router';
import {ContentService} from '../../shared/services/content.service';
import {Crew} from '../../shared/models/crew';

@Component({
  selector: 'app-crew',
  standalone: false,
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  injections = inject(ROUTER_OUTLET_DATA) as Signal<{texts: { [key: string]: any }, screenWidth: number}>;
  data!: Crew[];
  texts!: { [key: string]: any };
  selectedCrew = 0;

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
      const crewParam = params.get('crew');
      if (crewParam !== null) {
        this.selectedCrew = +crewParam;
      }
    });
    this.contentService.getCrews().subscribe({
      next: data => {
        this.data = data;
        console.log('Crews :', this.data);
      },
      error: err => {
        console.error('Erreur chargement destinations :', err);
      }
    });
  }
}
