import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Person} from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  url_link='https://giit-memoriesbook.herokuapp.com/rest/person';
  url_link_number_id='https://giit-memoriesbook.herokuapp.com/rest/person/number_id';
  

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    
  };



  constructor(private http: HttpClient) { 
    console.log('Hello spring rest person');
    this.getPerson()
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getIds(){
    return this.http.get(this.url_link);
  }


  getPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url_link)
    .pipe(
      tap(product => console.log('fetched person')),
      catchError(this.handleError('getPerson', []))
    );
  }

  //get person by id
  getPersonId(id): Observable<Person> {
    const url = `${this.url_link}/${id}`;
    
    return this.http.get<Person>(url).pipe(
      tap(_ => console.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPersonId id=${id}`))
    );
  }
  getPersonNumber(numer_id: string): Observable<Person> {
    const url = `${this.url_link_number_id}/${numer_id}`;
    return this.http.get<Person>(url).pipe(
      tap(_ => console.log(`fetched person id=${numer_id}`)),
      catchError(this.handleError<Person>(`getPersonId id=${numer_id}`))
    );
  }
    
  updatePerson(id, item): Observable<Person> {
    const url = `${this.url_link}/${id}`;
    return this.http.put<Person>(this.url_link, JSON.stringify(item), this.httpOptions).pipe(
      tap(_ => console.log(`updated person id=${id}`)),
      catchError(this.handleError<any>('updatePerson'))
    );
    
  }
  
}
