import {Component, HostListener, OnInit} from '@angular/core';
import {ContentService} from './shared/services/content.service';
import {PageEnum} from './shared/models/page-enum';
import {PageData} from './shared/models/page-data';
import { unflattenText } from './shared/utils/helper';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = "Space tourism";
  texts!: {[p: string]: any}
  page!: PageEnum;
  screenWidth!: number;
  navItems!: string[];
  data!: PageData;

  constructor(
    private contentService : ContentService,
  ) {
  }

  ngOnInit() {
    this.getTexts();

    this.getData();
    this.page = PageEnum.HOME;

    this.getScreenSize();
  }

  getTexts()  {
    this.contentService.getAllTextsFromDB().subscribe({
      next: data => {
        this.texts = unflattenText(data);
        this.afterTextsLoaded();
      },
      error: () => {
        console.warn("Backend inaccessible, chargement des textes depuis le fichier");
        this.contentService.getAllTextsFromFile().subscribe({
          next: fileData => {
            this.texts = fileData;
            this.afterTextsLoaded();
          },
          error: () => {
            console.error("Impossible de charger les textes depuis le fichier.");
          }
        });
      }
    });
  }

  getData() {
    forkJoin({
      dest: this.contentService.getDestinations(),
      crew: this.contentService.getCrews(),
      tech: this.contentService.getTechnologies()
    }).subscribe({
      next: result => {
      if (result.dest.length && result.crew.length && result.tech.length) {
        this.data = result;
      } else {
        console.warn("Chargement partiel ou vide, lecture du fichier de secours");
        this.loadDataFromFile();
      }
    },
      error: () => {
      console.warn("Échec du chargement des données, lecture du fichier de secours");
      this.loadDataFromFile();
    }
    });
  }

  loadDataFromFile() {
    this.contentService.getDataFromFile().subscribe({
      next: fileData => {
        this.data = {
          dest: fileData.destinations,
          crew: fileData.crew,
          tech: fileData.technology
        };
        console.log("Données depuis fichier :", this.data);
      },
      error: () => {
        console.error("Échec du chargement des données de secours");
      }
    });
  }

  afterTextsLoaded() {
    this.navItems = this.texts['nav'] || [];
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  protected readonly PageEnum = PageEnum;
}
