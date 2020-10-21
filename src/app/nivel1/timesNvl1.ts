import { Component } from '@angular/core';


@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.page.html',
  styleUrls: ['./nivel1.page.scss'],
})


export class TimesNvl1{

  id: string;
  tiempoP1: number;
  tiempoP2: number;
  tiempoP3: number;
  tiempoP4: number;
  btnAyuda: number;
  equivocacionesP1: number;
  equivocacionesP2: number;
  equivocacionesP3: number;
  equivocacionesP4: number;
  tiempoTotal: number;
  fecha: string;

    constructor(idUser:string, 
      tiempoP1U: number,
      tiempoP2U: number,
      tiempoP3U: number,
      tiempoP4U: number,
      btnAyudaU: number,
      pulsarP1U: number,
      pulsarP2U: number,
      pulsarP3U: number,
      pulsarP4U: number,
      tiempoTotalU: number,
      fechaU: string)
    {
      this.id = idUser, 
      this.tiempoP1= tiempoP1U;
      this.tiempoP2= tiempoP2U;
      this.tiempoP3= tiempoP3U;
      this.tiempoP4= tiempoP4U;
      this.btnAyuda= btnAyudaU;
      this.equivocacionesP1= pulsarP1U;
      this.equivocacionesP2= pulsarP2U;
      this.equivocacionesP3= pulsarP3U;
      this.equivocacionesP4= pulsarP4U;
      this.fecha = fechaU;
      this.tiempoTotal = tiempoTotalU;
    }
  }
  