import { Component } from '@angular/core';


@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.page.html',
  styleUrls: ['./nivel1.page.scss'],
})


export class Pieza{
    num:number;
    tam: any;
    pos: String;
    urlIm:String;

    constructor(numero:number, tamanio: any,posiciones: String, URL:String){
      this.num = numero;
      this.tam = tamanio;
      this.pos = posiciones;
      this.urlIm = URL;
    }
  }
  