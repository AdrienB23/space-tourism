import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destination} from '../models/destination';
import {Crew} from '../models/crew';
import {Technology} from '../models/technology';

const dbUrl = "https://space-tourism-backend-p27f.onrender.com";
const fileUrl = 'assets/data/';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {}

  getAllTextsFromDB(): Observable<{ [key: string]: any }> {
    return this.http.get<{ [key: string]: any }>(dbUrl + '/texts');
  }

  getAllTextsFromFile() {
    return this.http.get<any>(fileUrl + 'text.json');
  }

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(dbUrl + '/data/destinations');
  }

  getCrews(): Observable<Crew[]> {
    return this.http.get<Crew[]>(dbUrl + '/data/crews');
  }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(dbUrl + '/data/technologies');
  }

  getDataFromFile() {
    return this.http.get<any>(fileUrl + 'data.json');
  }
}
