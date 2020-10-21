import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { TimesNvl1 } from '../nivel1/timesNvl1';

@Injectable({
  providedIn: 'root'
})
export class TiempoUserNvl1 {

  constructor(private db: AngularFirestore) { 

  }

  getDatos() {
    return this.db.collection('tiempos').snapshotChanges();
  }

  crearTiempo(data: TimesNvl1){
    return this.db.collection('tiempos').doc(data.id+" "+data.fecha).set({...data});
  }

  borrarTiempos(data: string){
    this.db.doc('tiempos/' + data).delete();
  }
}
