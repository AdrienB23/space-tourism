import {Component, HostListener, OnInit} from '@angular/core';
import {ContentService} from './shared/services/content.service';
import {PageEnum} from './shared/models/page-enum';

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

  constructor(
    private contentService : ContentService,
  ) {
  }

  async ngOnInit() {
    await this.contentService.loadTexts();
    this.getScreenSize();
    this.texts = this.contentService.getAllTexts();
    this.page = PageEnum.HOME;
    this.navItems = this.texts['nav'] || [];
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  protected readonly PageEnum = PageEnum;
}
