import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ContentData} from '../../shared/models/content-data';
import {ContentText} from '../../shared/models/content-text';
import {PageEnum} from '../../shared/models/page-enum';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() data!: ContentData;
  @Input() text!: ContentText;
  @Input() page!: PageEnum;
  @Input() screenWidth!: number

  selectedItem = 'home';
  visible = false;

  private routerSub!: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.updateSelectedItem(this.router.url); // initialise la sélection

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedItem(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  updateSelectedItem(url: string) {
    const cleanUrl = url.replace(/^\/+/, '').split('/')[0];
    this.selectedItem = cleanUrl || 'home';
  }

  selectItem(item: string) {
    this.selectedItem = item;
  }

  openMenu() {
    this.visible = true;
    console.log(this.visible);
  }

  closeMenu() {
    this.visible = false;
    console.log(this.visible);
  }

}
