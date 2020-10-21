import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PersonService } from '../app/services/person.service';
import { HttpClientModule } from '@angular/common/http';
//Libreria de Dragula para hacer el Drang&Drop 
import {DragulaModule} from 'ng2-dragula';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: "AIzaSyCuhf5BGTAHmiYbdh18iKIL3pGRAz_SQjU",
    authDomain: "rompezabezas-626dc.firebaseapp.com",
    databaseURL: "https://rompezabezas-626dc.firebaseio.com",
    projectId: "rompezabezas-626dc",
    storageBucket: "rompezabezas-626dc.appspot.com",
    messagingSenderId: "888717713628",
    appId: "1:888717713628:web:dd84b7a731c7376ba25419",
    measurementId: "G-91R7NL1M5J"
  }
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,DragulaModule.forRoot(),AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,PersonService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
