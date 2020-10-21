import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpringService {

  url_link='https://giit-memoriesbook.herokuapp.com/rest/album';
  constructor(private http: HttpClient) { 
    console.log('Hello spring rest');
  }

  obtenerDatos(){
    return this.http.get(this.url_link);
  }
  getDetailPerson(numberId: String){
    return this.http.get(this.url_link+'/'+numberId);
  }
}
