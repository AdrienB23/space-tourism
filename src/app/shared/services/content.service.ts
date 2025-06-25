import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContentText} from '../models/content-text';
import {ContentData} from '../models/content-data';


const dataUrl = 'assets/data/';

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  constructor(private http: HttpClient) { }

  getText(): Observable<ContentText> {
    return this.http.get<ContentText>(dataUrl + "text.json");
  }

  getData(): Observable<ContentData> {
    return this.http.get<ContentData>(dataUrl + "data.json");
  }
}
