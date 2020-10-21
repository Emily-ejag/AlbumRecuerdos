import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-nivel2',
  templateUrl: './nivel2.page.html',
  styleUrls: ['./nivel2.page.scss'],
})


export class TimesNvl2{

    id: string;
    tiempoP1: number;
    tiempoP2: number;
    tiempoP3: number;
    tiempoP4: number;
    tiempoP5: number;
    tiempoP6: number;
    tiempoP7: number;
    tiempoP8: number;
    tiempoP9: number;
    btnAyuda: number;
    equivocacionesP1: number;
    equivocacionesP2: number;
    equivocacionesP3: number;
    equivocacionesP4: number;
    equivocacionesP5: number;
    equivocacionesP6: number;
    equivocacionesP7: number;
    equivocacionesP8: number;
    equivocacionesP9: number;
    tiempoTotal: number;
    fecha: string;
      constructor(idUser:string, 
        tiempoP1U: number,
        tiempoP2U: number,
        tiempoP3U: number,
        tiempoP4U: number,
        tiempoP5U: number,
        tiempoP6U: number,
        tiempoP7U: number,
        tiempoP8U: number,
        tiempoP9U: number,
        btnAyudaU: number,
        pulsarP1U: number,
        pulsarP2U: number,
        pulsarP3U: number,
        pulsarP4U: number,
        pulsarP5U: number,
        pulsarP6U: number,
        pulsarP7U: number,
        pulsarP8U: number,
        pulsarP9U: number,
        tiempoTotalU: number,
        fechaU: string)
      {
        this.id = idUser, 
        this.tiempoP1= tiempoP1U;
        this.tiempoP2= tiempoP2U;
        this.tiempoP3= tiempoP3U;
        this.tiempoP4= tiempoP4U;
        this.tiempoP5= tiempoP5U;
        this.tiempoP6= tiempoP6U;
        this.tiempoP7= tiempoP7U;
        this.tiempoP8= tiempoP8U;
        this.tiempoP9= tiempoP9U;
        this.btnAyuda= btnAyudaU;
        this.equivocacionesP1= pulsarP1U;
        this.equivocacionesP2= pulsarP2U;
        this.equivocacionesP3= pulsarP3U;
        this.equivocacionesP4= pulsarP4U;
        this.equivocacionesP5= pulsarP5U;
        this.equivocacionesP6= pulsarP6U;
        this.equivocacionesP7= pulsarP7U;
        this.equivocacionesP8= pulsarP8U;
        this.equivocacionesP9= pulsarP9U;
        this.tiempoTotal = tiempoTotalU;
        this.fecha = fechaU;
      }
    }
    