import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Section} from '../models/section';


@Injectable({
  providedIn: 'root'
})
export class SectionService {
  url_link='https://giit-memoriesbook.herokuapp.com/rest/section';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { 
    console.log('Hello spring rest section');
  }
  //Get all section

  getSection(): Observable<Section[]> {
    return this.http.get<Section[]>(this.url_link)
      .pipe(
        tap(product => console.log('fetched section')),
        catchError(this.handleError('getSection', []))
      );
  }
  //get section by id
  getSectionId(id: any): Observable<Section> {
    const url = `${this.url_link}/${id}`;
    return this.http.get<Section>(url).pipe(
      tap(_ => console.log(`fetched section id=${id}`)),
      catchError(this.handleError<Section>(`getSectionId id=${id}`))
    );
  }
  getSectionByName(name: any): Observable<Section> {
    const url = `${this.url_link}/name/${name}`;
    return this.http.get<Section>(url).pipe(
      tap(_ => console.log(`fetched section name=${name}`)),
      catchError(this.handleError<Section>(`getSectionByName name=${name}`))
    );
  }
  
  addSection(album: Section): Observable<Section> {
    return this.http.post<Section>(this.url_link, album, this.httpOptions).pipe(
      tap((prod: Section) => console.log(`added section w/ id=${prod.id}`)),
      catchError(this.handleError<Section>('addSection'))
    );
  }
  
  updateSection(id: any, product: any): Observable<any> {
    const url = `${this.url_link}/${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated section id=${id}`)),
      catchError(this.handleError<any>('updateSection'))
    );
  }
  
  deleteSection(id: any): Observable<Section> {
    const url = `${this.url_link}/${id}`;
  
    return this.http.delete<Section>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted section id=${id}`)),
      catchError(this.handleError<Section>('deleteSection'))
    );
  }
}
