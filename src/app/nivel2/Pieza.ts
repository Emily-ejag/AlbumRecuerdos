
import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-nivel2',
  templateUrl: './nivel2.page.html',
  styleUrls: ['./nivel2.page.scss'],
})


export class Pieza2{
    num:number;
    tam: String;
    pos: String;
    urlIm: String;
  
    constructor(numero:number, tamanio: String,posiciones: String, url:String){
      this.num = numero;
      this.tam = tamanio;
      this.pos = posiciones;
      this.urlIm = url;
    }
  }
  