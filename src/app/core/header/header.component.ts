import {Component, Input} from '@angular/core';
import {ContentData} from '../../shared/models/content-data';
import {ContentText} from '../../shared/models/content-text';
import {PageEnum} from '../../shared/models/page-enum';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() data!: ContentData;
  @Input() text!: ContentText;
  @Input() page!: PageEnum;
  @Input() screenWidth!: number

  selectedItem = 0;
  visible = false;

  selectItem(index: number) {
    this.selectedItem = index;
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
