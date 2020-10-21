import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {familiaresDatos} from '../../app/familiares/familiaresDatos';

@Injectable({
  providedIn: 'root'
})

export class FamiliaresService {

    constructor(private db: AngularFirestore) { 

    }
  
    getDatos() {
      return this.db.collection('tiemposFamiliares').snapshotChanges();
    }
  
    crearTiempo(data: familiaresDatos){
      return this.db.collection('tiemposFamiliares').doc(data.id+" "+data.fecha).set({...data});
    }
  
    borrarTiempos(data: string){
      this.db.doc('tiemposFamiliares/' + data).delete();
    }

}