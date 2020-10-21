import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Album} from '../models/album';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  
  url_link='https://giit-memoriesbook.herokuapp.com/rest/album';
  
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
    console.log('Hello spring rest album');
  }
  //Get all album

  getAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(this.url_link)
      .pipe(
        tap(product => console.log('fetched album')),
        catchError(this.handleError('getAlbum', []))
      );
  }
  //get album by id
  getAlbumId(id: any): Observable<Album> {
    const url = `${this.url_link}/${id}`;
    return this.http.get<Album>(url).pipe(
      tap(_ => console.log(`fetched album id=${id}`)),
      catchError(this.handleError<Album>(`getAlbumId id=${id}`))
    );
  }
  
  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.url_link, album, this.httpOptions).pipe(
      tap((prod: Album) => console.log(`added album w/ id=${prod.id}`)),
      catchError(this.handleError<Album>('addAlbum'))
    );
  }
  
  updateAlbum(id: any, product: any): Observable<any> {
    const url = `${this.url_link}/${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated album id=${id}`)),
      catchError(this.handleError<any>('updateAlbum'))
    );
  }
  
  deleteAlbum(id: any): Observable<Album> {
    const url = `${this.url_link}/${id}`;
  
    return this.http.delete<Album>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted album id=${id}`)),
      catchError(this.handleError<Album>('deleteAlbum'))
    );
  }

  
}
