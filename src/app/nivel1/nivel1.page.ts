import { Component, OnInit } from '@angular/core';
import { Pieza } from '../nivel1/Pieza';
import { Howl } from 'howler';
import  Swal  from 'sweetalert2';
import { URL_CONFIG } from '../seleccionImg/Variable';
import {NavController, AlertController, Platform} from '@ionic/angular';
import { TiempoUserNvl1 } from '../services/tiempoUserNvl1.service';
import { TimesNvl1 } from '../nivel1/timesNvl1';
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
  selector: 'app-nivel1',
  templateUrl: './nivel1.page.html',
  styleUrls: ['./nivel1.page.scss'],
})
export class Nivel1Page implements OnInit {

  constructor(private tiempoNvl1: TiempoUserNvl1, public navCtrl: NavController, private plt: Platform, public alertController: AlertController) {
  }
  //cedula = CEDULA.cedulaUser; quitar cuando se haga bien el inicio de los datos
  cedula;
  repetidoOno=0;
  dataUser: TimesNvl1;
  estadoPuzzle= false;
  URLim = URL_CONFIG.launchUrl;
  URL_CONFIG2 = this.URLim;
  p1= false;
  p2= false;
  p3= false;
  p4= false;
  timerInterval
  //Variables para calcular cantidad de intentos
  pulsarAyuda=-1;
  pulsarP1= -1;
  pulsarP2= -1;
  pulsarP3= -1;
  pulsarP4= -1;
  tiempoP1= 0;
  tiempoP2= 0;
  tiempoP3= 0;
  tiempoP4= 0;
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
  data = [
    new Pieza(2,"150px","0px -150px",this.URLim),
    new Pieza(0,"150px","0px 0px",this.URLim),
    new Pieza(1,"150px","-150px 0px",this.URLim),
    new Pieza(3,"150px","-150px -150px",this.URLim)
  ];
  data2 = []
  data3 = [];
  data4 =[];
  data5 = [];

  encerrarValores(){
    this.estadoPuzzle= false;
    this.URLim = URL_CONFIG.launchUrl;
    this.URL_CONFIG2 = this.URLim;
    this.p1= false;
    this.p2= false;
    this.p3= false;
    this.p4= false;
    this.timerInterval
    //Variables para calcular cantidad de intentos
    this.pulsarAyuda=-1;
    this.pulsarP1= -1;
    this.pulsarP2= -1;
    this.pulsarP3= -1;
    this.pulsarP4= -1;
    this.tiempoP1= 0;
    this.tiempoP2= 0;
    this.tiempoP3= 0;
    this.tiempoP4= 0;
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
      new Pieza(2,"150px","0px -150px",this.URLim),
      new Pieza(0,"150px","0px 0px",this.URLim),
      new Pieza(1,"150px","-150px 0px",this.URLim),
      new Pieza(3,"150px","-150px -150px",this.URLim)
    ];
    this.data2 = []
    this.data3 = [];
    this.data4 =[];
    this.data5 = [];
  }

  ngOnInit() {
    this.cedula = "0106490006";
    console.log("CEDULA:"+this.cedula)
    
    this.encerrarValores();
    this.startCron();
    this.presentAlerta();
    this.myDate =  new Date();
  }
  
  create( datosNuevos: TimesNvl1 ){
    this.tiempoNvl1.crearTiempo(datosNuevos);
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
    console.log(this.tiempoP3 + "segundos");
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
    console.log(this.tiempoP4  + "segundos");
  }

  resuelto(){
    if(this.p1==true && this.p2==true && this.p3==true && this.p4==true){
      this.start(this.playlist[2]);
      this.imgResuelta();
      if(this.pulsarAyuda==-1){
        this.pulsarAyuda = 0;
      }
      this.myDate7 = new Date();
      this.mes = this.myDate7.getMonth()+1;
      this.dia = this.myDate7.getDate();
      this.anio = this.myDate7.getFullYear();
      this.horaJuego = this.myDate7.getHours() + ':' + this.myDate7.getMinutes() + ':' + this.myDate7.getSeconds();
      this.dataUser = new TimesNvl1(this.cedula,this.tiempoP1,this.tiempoP2,
      this.tiempoP3,this.tiempoP4,this.pulsarAyuda,this.pulsarP1,this.pulsarP2,this.pulsarP3,this.pulsarP4,
      this.tiempoTotal,this.mes+"-"+this.dia+"-"+this.anio+" Hora: "+this.horaJuego+" Lvl1");
      this.create(this.dataUser);
      
    }
  }

  async imgResuelta(){
    this.estadoPuzzle=true;
    this.myDate2 = new Date;
    this.myDate3 = ((this.myDate2 - this.myDate) / 1000) - 5;
    console.log(this.myDate3  + "segundos");
    this.tiempoTotal = this.myDate3;
    this.repetidoOno=1;
    const alert = await this.alertController.create({
      header: 'LO LOGRASTE',
      message: '<img src="../assets/img/won.gif">',
      buttons: [{
        text:'CONTINUAR',
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
  /* cronometro */
  
  public centesimas = 0;
  public minutos = 0;
  public segundos = 0;
  public contador: any;

  public _centesimas: string = '00';
  public _minutos: string = '00';
  public _segundos: string = '00';

  isRun = false;
  estado: string = 'play';
  refreshColor = 'light';

  startCron() {
    if(this.repetidoOno==0){ 
    this.contador = setInterval(() => {
      this.centesimas += 1;
      if (this.centesimas < 10) this._centesimas = '0' + this.centesimas;
      else this._centesimas = '' + this.centesimas;
      if (this.centesimas == 10) {
        this.centesimas = 0;
        this.segundos += 1;
        if (this.segundos < 10) this._segundos = '0' + this.segundos;
        else this._segundos = this.segundos + '';
        if (this.segundos == 60) {
          this.segundos = 0;
          this.minutos += 1;
          if (this.minutos < 10) this._minutos = '0' + this.minutos;
          else this._minutos = this.minutos + '';
          this._segundos = '00';
          if (this.minutos == 2) {
            console.log("minutos: "+ this.minutos)
            if(this.repetidoOno==0){ 
              clearInterval(this.contador);
              this.minutos = 0;
              this.segundos = 0;
              this.centesimas = 0;
        
              this._centesimas = '00';
              this._segundos = '00';
              this._minutos = '00';
        
              this.estado = 'play';
              this.isRun = false;
              this.contador = null;
              alert(" TIEMPO AGOTADO, VUELVA A EMPEZAR ");
              this.ngOnInit(); 
            }
          }
        }
      }
    }, 100)}
    else{
      clearInterval(this.contador);
    }
  }

}
