import { Component, OnInit } from '@angular/core';
import { Pieza } from '../nivel1/Pieza';
import { Howl } from 'howler';
import  Swal  from 'sweetalert2';
import { URL_CONFIG } from '../seleccionImg/Variable';
import { TiempoUserNvl1 } from '../services/tiempoUserNvl1.service';
import { TimesNvl2 } from '../nivel2/timesNvl2';
import {NavController, AlertController, Platform} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { CEDULA } from '../seleccionImg/Variable';

export interface Track{
  name:String;
  path:String;
}

function remove(item: Pieza, list: Pieza []) {
  if (list.indexOf(item) !== -1) {
    list.splice(list.indexOf(item), 1);
  }
}

@Component({
  selector: 'app-nivel2',
  templateUrl: './nivel2.page.html',
  styleUrls: ['./nivel2.page.scss'],
})


export class Nivel2Page implements OnInit {
  //cedula = CEDULA.cedulaUser;
  cedula = "0106490006";
  repetidoOno2=0;
  estadoPuzzle=false;
  dataUser: TimesNvl2;
  p1= false;
  p2= false;
  p3= false;
  p4= false;
  p5= false;
  p6= false;
  p7= false;
  p8= false;
  p9= false;
  timerInterval
  URLim = URL_CONFIG.launchUrl;
  //Variables para calcular cantidad de intentos
  pulsarAyuda=-1;
  pulsarP1= -1;
  pulsarP2= -1;
  pulsarP3= -1;
  pulsarP4= -1;
  pulsarP5= -1;
  pulsarP6= -1;
  pulsarP7= -1;
  pulsarP8= -1;
  pulsarP9= -1;
  tiempoP1= 0;
  tiempoP2= 0;
  tiempoP3= 0;
  tiempoP4= 0;
  tiempoP5= 0;
  tiempoP6= 0;
  tiempoP7= 0;
  tiempoP8= 0;
  tiempoP9= 0;
  tiempoTotal= 0;
  //Variables para calcular tiempo
  myDate;
  myDate2;
  myDate3;
  myDate4;
  myDate5;
  myDate6;
  myDate7;
  //
  dia;
  mes;
  anio;
  horaJuego;
  //
  data: Array <Pieza> = [
    new Pieza(5,"100px","-200px -100px",this.URLim),
    new Pieza(1,"100px","-100px 0px",this.URLim),
    new Pieza(0,"100px","0px 0px",this.URLim),
    new Pieza(6,"100px","0px -200px",this.URLim),
    new Pieza(2,"100px","-200px 0px",this.URLim),
    new Pieza(8,"100px","-200px -200px",this.URLim),
    new Pieza(3,"100px","0px -100px",this.URLim),
    new Pieza(4,"100px","-100px -100px",this.URLim),
    new Pieza(7,"100px","-100px -200px",this.URLim), 
  ];
  data2: Array <Pieza> = []
  data3: Array <Pieza> = [];
  data4: Array <Pieza> = [];
  data5: Array <Pieza> = [];
  data6: Array <Pieza> = [];
  data7: Array <Pieza> = [];
  data8: Array <Pieza> = [];
  data9: Array <Pieza> = [];
  data10: Array <Pieza> = [];

  /* cronometro */
  
  public centesimas2: number = 0;
  public minutos2: number = 0;
  public segundos2: number = 0;
  public contador2: any;

  public _centesimas2: string = '00';
  public _minutos2: string = '00';
  public _segundos2: string = '00';

  isRun2 = false;
  estado2: string = 'play';
  refreshColor2 = 'light';

  encerrarVariables(){
    this.estadoPuzzle=false;
    this.p1= false;
    this.p2= false;
    this.p3= false;
    this.p4= false;
    this.p5= false;
    this.p6= false;
    this.p7= false;
    this.p8= false;
    this.p9= false;
    this.timerInterval
    this.URLim = URL_CONFIG.launchUrl;
    //Variables para calcular cantidad de intentos
    this.pulsarAyuda=-1;
    this.pulsarP1= -1;
    this.pulsarP2= -1;
    this.pulsarP3= -1;
    this.pulsarP4= -1;
    this.pulsarP5= -1;
    this.pulsarP6= -1;
    this.pulsarP7= -1;
    this.pulsarP8= -1;
    this.pulsarP9= -1;
    this.tiempoP1= 0;
    this.tiempoP2= 0;
    this.tiempoP3= 0;
    this.tiempoP4= 0;
    this.tiempoP5= 0;
    this.tiempoP6= 0;
    this.tiempoP7= 0;
    this.tiempoP8= 0;
    this.tiempoP9= 0;
    this.tiempoTotal= 0;
    //Variables para calcular tiempo
    this.myDate;
    this.myDate2;
    this.myDate3;
    this.myDate4;
    this.myDate5;
    this.myDate6;
    //
    this.data = [
      new Pieza(5,"100px","-200px -100px",this.URLim),
      new Pieza(1,"100px","-100px 0px",this.URLim),
      new Pieza(0,"100px","0px 0px",this.URLim),
      new Pieza(6,"100px","0px -200px",this.URLim),
      new Pieza(2,"100px","-200px 0px",this.URLim),
      new Pieza(8,"100px","-200px -200px",this.URLim),
      new Pieza(3,"100px","0px -100px",this.URLim),
      new Pieza(4,"100px","-100px -100px",this.URLim),
      new Pieza(7,"100px","-100px -200px",this.URLim), 
    ];
    this.data2 = []
    this.data3 = [];
    this.data4 = [];
    this.data5 = [];
    this.data6 = [];
    this.data7 = [];
    this.data8= [];
    this.data9= [];
    this.data10 = [];
  }

  ngOnInit() {
    this.encerrarVariables();
    this.startCrono();
    this.presentAlerta();
    this.myDate =  new Date();
  }

  constructor(private tiempoNvl2: TiempoUserNvl1, public navCtrl: NavController, private plt: Platform, public alertController: AlertController) {

  }

  playlist : Track[]=[{

    name: 'correcto',
    path: '../assets/mp3/correcto.mpeg'

  },{

    name: 'dejarPieza',
    path: '../assets/mp3/dejarPieza.mpeg'

  },{

    name: 'ganaste',
    path: '../assets/mp3/ganaste.ogg'

  }]

  player: Howl =null;

  start(track:Track){
    this.player=new Howl({
      src: [track.path]
    });
    this.player.play();
  }

  cajaMover?:  Array <any>;

  move0(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP1++;
    console.log("Pulsado P1 "+this.pulsarP1);
    if(box.num == 0){
      remove(box, this.data);
      remove(box, this.data2);
      toList.push(box);
      this.p1= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }else{
      this.p1= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 100);
    this.tiempoP1 = this.tiempoP1 + this.myDate6;
    console.log(this.tiempoP1  + "segundos");
  }
  move1(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP2++;
    console.log("Pulsado P2 "+this.pulsarP2);
    if(box.num == 1){
      remove(box, this.data);
      remove(box, this.data3);
      toList.push(box);
      this.p2= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p2= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP2 = this.tiempoP2 + this.myDate6;
    console.log(this.tiempoP2  + "segundos");
  }
  move2(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP3++;
    console.log("Pulsado P3 "+this.pulsarP3);
    if(box.num == 2){
      remove(box, this.data);
      remove(box, this.data4);
      toList.push(box);
      this.p3= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p3= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP3 = this.tiempoP3 + this.myDate6;
    console.log(this.tiempoP3  + "segundos");
  }
  move3(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP4++;
    console.log("Pulsado P4 "+this.pulsarP4);
    if(box.num == 3){
      remove(box, this.data);
      remove(box, this.data5);
      toList.push(box);
      this.p4= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p4= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP4 = this.tiempoP4 + this.myDate6;
    console.log(this.tiempoP4 + "segundos");
  }
  move4(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP5++;
    console.log("Pulsado P5 "+this.pulsarP5);
    if(box.num == 4){
      remove(box, this.data);
      remove(box, this.data6);
      toList.push(box);
      this.p5= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p5= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP5 = this.tiempoP5 + this.myDate6;
    console.log(this.tiempoP5  + "segundos");
  }
  move5(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP6++;
    console.log("Pulsado P6 "+this.pulsarP6);
    if(box.num == 5){
      remove(box, this.data);
      remove(box, this.data6);
      toList.push(box);
      this.p6= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p6= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP6 = this.tiempoP6 + this.myDate6;
    console.log(this.tiempoP6  + "segundos");
  }
  move6(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP7++;
    console.log("Pulsado P7 "+this.pulsarP7);
    if(box.num == 6){
      remove(box, this.data);
      remove(box, this.data6);
      toList.push(box);
      this.p7= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p7= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP7 = this.tiempoP7 + this.myDate6;
    console.log(this.tiempoP7  + "segundos");
  }
  move7(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP8++;
    console.log("Pulsado P8 "+this.pulsarP8);
    if(box.num == 7){
      remove(box, this.data);
      remove(box, this.data6);
      toList.push(box);
      this.p8= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p8= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP8 = this.tiempoP8 + this.myDate6;
    console.log(this.tiempoP8  + "segundos");
  }
  move8(box:Pieza, toList: Pieza []): void {
    this.myDate4 = new Date;
    this.pulsarP9++;
    console.log("Pulsado P9 "+this.pulsarP9);
    if(box.num == 8){
      remove(box, this.data);
      remove(box, this.data6);
      toList.push(box);
      this.p9= true;
      this.start(this.playlist[1]);
      this.resuelto();
    }
    else{
      this.p9= false;
      this.start(this.playlist[0]);
    }
    this.myDate5 = new Date;
    this.myDate6 = ((this.myDate5 - this.myDate4) / 1000);
    this.tiempoP9 = this.tiempoP9 + this.myDate6;
    console.log(this.tiempoP9  + "segundos");
  }

  create( datosNuevos: TimesNvl2 ){
    this.tiempoNvl2.crearTiempo(datosNuevos);
  }

  resuelto(){
    if(this.p1==true && this.p2==true && this.p3==true && this.p4==true
      && this.p5==true && this.p6==true && this.p7==true && this.p8==true
      && this.p9==true){
      this.imgResuelta();
      if(this.pulsarAyuda == -1){
        this.pulsarAyuda=0;
      }
      this.myDate7 = new Date();
      this.mes = this.myDate7.getMonth()+1;
      this.dia = this.myDate7.getDate();
      this.anio = this.myDate7.getFullYear();
      this.horaJuego = this.myDate7.getHours() + ':' + this.myDate7.getMinutes() + ':' + this.myDate7.getSeconds();
      this.dataUser = new TimesNvl2(this.cedula,this.tiempoP1,this.tiempoP2,
      this.tiempoP3,this.tiempoP4,this.tiempoP5,this.tiempoP6,this.tiempoP7,this.tiempoP8,this.tiempoP9,this.pulsarAyuda,this.pulsarP1,this.pulsarP2,this.pulsarP3,this.pulsarP4,
      this.pulsarP5,this.pulsarP6,this.pulsarP7,this.pulsarP8,this.pulsarP9,this.tiempoTotal,
      this.mes+"-"+this.dia+"-"+this.anio+" Hora: "+this.horaJuego+" Lvl2");
      this.create(this.dataUser);
      this.start(this.playlist[2]);
      this.repetidoOno2=1;
    }
  }

  async imgResuelta(){
    this.estadoPuzzle=true;
    this.myDate2 = new Date;
    this.myDate3 = ((this.myDate2 - this.myDate) / 1000) - 5;
    console.log(this.myDate3  + "segundos");
    this.tiempoTotal = this.myDate3;
    const alert = await this.alertController.create({
      header: 'LO LOGRASTE',
      message: '<img src="../assets/img/won.gif">',
      buttons: [{
        text:'FINALIZAR',
        handler:()=>{
          console.log('pagina siguiente nivel');
        }
      }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    
    
  }

  async presentAlerta(){
  this.pulsarAyuda++;
  console.log("pulsado: "+ this.pulsarAyuda);
  Swal.fire({
    title: 'RECUERDA LA IMAGEN',
    imageUrl: this.URLim,
    timer: 5000,
    timerProgressBar: true,
    onBeforeOpen: () => {
      Swal.showLoading()
      this.timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b');
          if (b) {
            b.textContent = Swal.getTimerLeft().toString()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(this.timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  }

  estaResuelto(){
    if(this.estadoPuzzle == false){
      alert("DEBE TERMINAR EL PUZZLE PARA CONTINUAR")
    }else{
      this.estadoPuzzle=true;
    }
  }

  startCrono() {
    if(this.repetidoOno2==0){
    this.contador2 = setInterval(() => {
      this.centesimas2 += 1;
      if (this.centesimas2 < 10) this._centesimas2 = '0' + this.centesimas2;
      else this._centesimas2 = '' + this.centesimas2;
      if (this.centesimas2 == 10) {
        this.centesimas2 = 0;
        this.segundos2 += 1;
        if (this.segundos2 < 10) this._segundos2 = '0' + this.segundos2;
        else this._segundos2 = this.segundos2 + '';
        if (this.segundos2 == 60) {
          this.segundos2 = 0;
          this.minutos2 += 1;
          if (this.minutos2 < 10) this._minutos2 = '0' + this.minutos2;
          else this._minutos2 = this.minutos2 + '';
          this._segundos2 = '00';
          if (this.minutos2 == 3) {
            console.log("minutos: "+ this.minutos2)
            if(this.repetidoOno2==0){ 
              clearInterval(this.contador2);
              this.minutos2 = 0;
              this.segundos2 = 0;
              this.centesimas2 = 0;
        
              this._centesimas2 = '00';
              this._segundos2 = '00';
              this._minutos2 = '00';
        
              this.estado2 = 'play';
              this.isRun2 = false;
              this.contador2 = null;
              alert(" TIEMPO AGOTADO, VUELVA A EMPEZAR ");
              this.ngOnInit(); 
            }
          }
        }
      }
    }, 100)}else{
      clearInterval(this.contador2);
    }
  }

}
