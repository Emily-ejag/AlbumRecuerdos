import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineaTiempoPageRoutingModule } from './linea-tiempo-routing.module';

import { LineaTiempoPage } from './linea-tiempo.page';
//Libreria de Dragula para hacer el Drang&Drop 
import {DragulaModule} from 'ng2-dragula';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineaTiempoPageRoutingModule, DragulaModule.forRoot()
  ],

  declarations: [LineaTiempoPage]
})
export class LineaTiempoPageModule {

  constructor(){}

}