import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.dev/api'

  constructor(private http: HttpClient) { }

  getFilms(): Observable <any> {
    return this.http.get<any>(`${this.apiUrl}/films`);
  }

  getFilm(episodeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/films/`).pipe(
      map((data: { results: any[]; }) => data.results.find(film => film.episode_id === episodeId))
    );
  }
  
  getEntities(urls: string[]): Observable <any>[] {
    return urls.map(url => this.http.get<any>(url));
  }
}
