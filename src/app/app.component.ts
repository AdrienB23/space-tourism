import {Component, HostListener, OnInit} from '@angular/core';
import {ContentService} from './shared/services/content.service';
import {PageEnum} from './shared/models/page-enum';
import {PageData} from './shared/models/page-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  texts!: {[p: string]: any}
  page!: PageEnum;
  screenWidth!: number;
  navItems!: string[];
  data!: PageData;

  constructor(
    private contentService : ContentService,
  ) {
  }

  async ngOnInit() {
    await this.contentService.loadTexts();
    this.getScreenSize();
    this.texts = this.contentService.getAllTexts();
    this.data = this.contentService.getData();
    this.page = PageEnum.HOME;
    this.navItems = this.texts['nav'] || [];
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  protected readonly PageEnum = PageEnum;
}
