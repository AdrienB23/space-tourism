import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {Destination} from '../models/destination';
import {Crew} from '../models/crew';

const url = "https://space-tourism-backend-p27f.onrender.com";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private textsSubject = new BehaviorSubject<{ [key: string]: any }>({});
  texts$ = this.textsSubject.asObservable();

  constructor(private http: HttpClient) {}

  async loadTexts(): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<{ [key: string]: any }>(url + '/texts'));
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
    return this.http.get<Destination[]>(url + '/data/destinations');
  }

  getCrews(): Observable<Crew[]> {
    return this.http.get<Crew[]>(url + '/data/crews');
  }
}
