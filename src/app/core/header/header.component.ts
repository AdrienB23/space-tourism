import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  @Input() page!: PageEnum;
  @Input() navItems!: string[];
  @Input() texts!: { [key: string]: any };
  @Input() screenWidth!: number;
  @Output() pageChange = new EventEmitter<unknown>();

  selectedItem = 'home';
  visible = false;

  private routerSub!: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.updateSelectedItem(this.router.url);

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
    switch(this.selectedItem) {
      case 'home': this.page = PageEnum.HOME; break;
      case 'destination': this.page = PageEnum.DESTINATION; break;
      case 'crew': this.page = PageEnum.CREW; break;
      case 'technology': this.page = PageEnum.TECHNOLOGY; break;
    }
    this.pageChange.emit(this.page);
  }

  selectItem(item: string) {
    this.selectedItem = item;
  }

  openMenu() {
    this.visible = true;
  }

  closeMenu() {
    this.visible = false;
  }

}
