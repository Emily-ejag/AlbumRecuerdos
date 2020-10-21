import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Photo} from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  url_link='https://giit-memoriesbook.herokuapp.com/rest/photo';
  urlLinkSection='https://giit-memoriesbook.herokuapp.com/rest/section';
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
    console.log('Hello spring rest photo');
  }
  //Get all photo

  getNombres(){
    return this.http.get(this.url_link);
  } 
  getPhoto(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url_link)
      .pipe(
        tap(product => console.log('fetched photo')),
        catchError(this.handleError('getPhoto', []))
      );
  }

  getPhotoByPersonId(id): Observable<Photo[]> {
    const url = `${this.url_link}/person/${id}`;
    return this.http.get<Photo[]>(url)
      .pipe(
        tap(product => console.log('fetched photo Person ID')),
        catchError(this.handleError('getPhoto', []))
      );
  }

  //get photo by id
  getPhotoId(id: any): Observable<Photo> {
    const url = `${this.url_link}/${id}`;
    return this.http.get<Photo>(url).pipe(
      tap(_ => console.log(`fetched photo id=${id}`)),
      catchError(this.handleError<Photo>(`getPhotoId id=${id}`))
    );
  }
  
  addPhoto(album: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.url_link, album, this.httpOptions).pipe(
      tap((prod: Photo) => console.log(`added photo w/ id=${prod.id}`)),
      catchError(this.handleError<Photo>('addPhoto'))
    );
  }
  
  updatePhoto(id: any, product: any): Observable<any> {
    const url = `${this.url_link}/${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated photo id=${id}`)),
      catchError(this.handleError<any>('updatePhoto'))
    );
  }
  
  deletePhoto(id: any): Observable<Photo> {
    const url = `${this.url_link}/${id}`;
  
    return this.http.delete<Photo>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted photo id=${id}`)),
      catchError(this.handleError<Photo>('deletePhoto'))
    );
  }

  getPhotosByIdPerson(idSection,idPerson) {
    const urlS=`${this.urlLinkSection}/byPersonID/`;
    return this.http.get<Photo[]>(urlS+'?id='+idSection+'&idPerson='+idPerson).pipe(
      tap(product => console.log('fetched section')),
      catchError(this.handleError('getPhotoByPersonID', []))
    );
  }
}
