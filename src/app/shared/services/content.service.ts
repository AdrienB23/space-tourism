import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {Destination} from '../models/destination';
import {Crew} from '../models/crew';
import {Technology} from '../models/technology';
import {PageData} from '../models/page-data';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private textsSubject = new BehaviorSubject<{ [key: string]: any }>({});
  texts$ = this.textsSubject.asObservable();

  constructor(private http: HttpClient) {}

  async loadTexts(): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<{ [key: string]: any }>('http://localhost:8000/texts'));
      this.textsSubject.next(data || {});
      console.log('Texts loaded in service:', data);
    } catch (error) {
      console.error('Erreur lors du chargement des textes', error);
    }
  }

  getAllTexts(): { [key: string]: any } {
    return this.textsSubject.value;
  }

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>('http://localhost:8000/data/destinations');
  }

  getCrews(): Observable<Crew[]> {
    return this.http.get<Crew[]>('http://localhost:8000/data/crews');
  }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>('http://localhost:8000/data/technologies');
  }

  getData() {
    let pageData: PageData = {
      dest: [],
      crew: [],
      tech: []
    };
    this.getDestinations().subscribe(
      data => {
        pageData.dest = data;
      }
    );
    this.getCrews().subscribe(
      data => {
        pageData.crew = data;
      }
    );
    this.getTechnologies().subscribe(
      data => {
        pageData.tech = data;
      }
    );
    return pageData;
  }
}
