import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Match} from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  url_link='https://giit-memoriesbook.herokuapp.com/rest/match';
  url_link_person='https://giit-memoriesbook.herokuapp.com/rest/match/person';
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
    console.log('Hello spring rest match');
  }
  //Get all match

  getMatch(): Observable<Match[]> {
    return this.http.get<Match[]>(this.url_link)
      .pipe(
        tap(product => console.log('fetched match')),
        catchError(this.handleError('getMatch', []))
      );
  }
  //get match by id
  getMatchId(id: any): Observable<Match> {
    const url = `${this.url_link}/${id}`;
    return this.http.get<Match>(url).pipe(
      tap(_ => console.log(`fetched match id=${id}`)),
      catchError(this.handleError<Match>(`getMatchId id=${id}`))
    );
  }

  getCountMatch(id:any) {
    const url = `${this.url_link_person}/${id}`;
    return this.http.get(url).pipe(
      tap(_ => console.log(`fetched match id=${id}`)),
      catchError(this.handleError(`getMatchId id=${id}`))
    );
  }
  
  addMatch(album: Match): Observable<Match> {
    return this.http.post<Match>(this.url_link, album, this.httpOptions).pipe(
      tap((prod: Match) => console.log(`added match w/ id=${prod.id}`)),
      catchError(this.handleError<Match>('addMatch'))
    );
  }
  
  updateMatch(id: any, product: any): Observable<any> {
    const url = `${this.url_link}/${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated match id=${id}`)),
      catchError(this.handleError<any>('updateMatch'))
    );
  }
  
  deleteMatch(id: any): Observable<Match> {
    const url = `${this.url_link}/${id}`;
  
    return this.http.delete<Match>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted match id=${id}`)),
      catchError(this.handleError<Match>('deleteMatch'))
    );
  }
}
