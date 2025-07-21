import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {ContentService} from '../../shared/services/content.service';
import {Subscription} from 'rxjs';

@Pipe({
  name: 'text',
  standalone: false
})
export class TextPipe implements PipeTransform, OnDestroy {
  private texts: { [key: string]: string } = {};
  private sub: Subscription;

  constructor(private contentService: ContentService) {
    this.sub = this.contentService.texts$.subscribe(texts => {
      this.texts = texts;
    });
  }

  transform(key: string): string {
    return this.texts[key] || '';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
