import {Component, Injector, OnInit} from '@angular/core';
import {ContentService} from './shared/services/content.service';
import {ContentData} from './shared/models/content-data';
import {ContentText} from './shared/models/content-text';
import {PageEnum} from './shared/models/page-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  text!: ContentText;
  data!: ContentData;
  page!: PageEnum;

  constructor(
    private contentService : ContentService,
    private injector: Injector
  ) {
  }

  ngOnInit() {
    this.getData();
    this.getText();
    this.page = PageEnum.HOME;
  }

  getData() {
    this.contentService.getData().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
      }
    )
  }

  getText() {
    this.contentService.getText().subscribe(
      data => {
        this.text = data;
        console.log(this.text);
      }
    )
  }

  get customInjector() {
    return Injector.create({
      providers: [
        {provide: 'text', useValue: this.text},
        {provide: 'data', useValue: this.data}
      ],
      parent: this.injector
    })
  }
}
