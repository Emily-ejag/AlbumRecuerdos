import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { PhotoService } from '../../app/services/photo.service';
import { Photo } from '../models/photo';
import { PersonService } from '../../app/services/person.service';
import { Subscriber } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';
import { ModalController } from '@ionic/angular';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {familiaresDatos} from '../../app/familiares/familiaresDatos';
import {FamiliaresService} from '../services/familiares.service';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.page.html',
  styleUrls: ['./familiares.page.scss'],
})
export class FamiliaresPage implements OnInit {

  selectQuadrant = 'photosRandom';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
    
  };

  personId = null;
  personId2 = null;
  photos: Photo[] = [];
  photosOrdenadas: Photo[] = [];
  photosRandom: Photo[] = [];
  photosRandom2: Photo[] = [];
  ids: number[]=[];
  arrayNumeros: any []=[];
  arrayNombres: any []=[];
 numPhotosArray1:number =3; // numero para coger fotos de la persona
 numPhotosArray2:number =3;// numero para coger fotos random
 errores: number =0;
 aciertos: number =0;
 

myDate;
mes;
dia;
anio;
horajuego;

 //tiempo para pregunta 1
 DateP11;
 DateP12;
 DateP13;

 //tiempo para pregunta 2
 DateP21;
 DateP22;
 DateP23;

 //tiempo para pregunta 3
 DateP31;
 DateP32;
 DateP33;

 //DATOS A GUARDAR
 familiaresData: familiaresDatos;

 arrayDescripciones: any []=["Tío","Primo","Abuelo","Mamá","Papá","Sobrino","Hijo","Tía","Prima","Abuela","Sobrina","Hija"];


 constructor(private http: HttpClient, public alertController: AlertController,private route: ActivatedRoute, private router: Router, public photoService: PhotoService,
    private loadingController: LoadingController, private dragulaService: DragulaService, private toas: ToastController, public persona: PersonService,
    private modalControl: ModalController, private famDatos: FamiliaresService) {
    //Drag&Drop
    this.dragulaService.drag("dragula_band")
      .subscribe(({ el}) => {
        el.setAttribute('urlImage', '');
      });
  }

  ngOnInit() {
    //this.personId = this.route.snapshot.params['id'];
    this.personId = 145;
    //nombres
    this.photoService.getNombres().subscribe((res: any) => { 
      for (var i = 0; i < res.length; i++) {
        this.arrayNombres[i]=res[i].name; 
        console.log( this.arrayNombres[i]);
      }});

    //metodo para coger los ids disponibles en la base
   this.persona.getIds().subscribe((res: any) => { 
      for (var i = 0; i < res.length; i++) {
        this.arrayNumeros[i]=res[i].id; 
        console.log( this.arrayNumeros[i]);

      }
      // cogiendo aleatoriamente otro id para mostrar fotos   
      do {
        var aleatoero = Math.round(Math.random()*(this.arrayNumeros.length - 1));
        console.log("lenght"+ this.arrayNumeros.length);
        console.log("id Aleatoreo escogido "+ aleatoero);
        console.log("arrayNumeros "+ this.arrayNumeros[aleatoero]);    
        this.personId2 = this.arrayNumeros[aleatoero];
        console.log("id Aleatoreo escogido "+ this.personId2);
      } while (this.personId == this.personId2);
      
       });
    // this.personId2= 145;
    console.log("Entra id: " + this.personId);
    if (this.personId) {
      console.log("Entra id: " + this.personId);
      this.loadPhotos();
    }
  }

  async loadPhotos() {
    const loading = await this.loadingController.create({
      message: 'Cargando.....'
    });
    await loading.present();
    //conseguir los ids totales
    //con numId = this.photoService.getPhotoByPersonId

    const p = this.photoService.getPhotosByIdPerson(180,this.personId);
    const p2 = this.photoService.getPhotosByIdPerson(180,this.personId2);
    console.log('result' + p);
    p.subscribe(res => {
      loading.dismiss();
      this.photosRandom = res;
      console.log("fotos "+this.photosRandom);
      while (this.photosRandom.length > this.numPhotosArray1) {
        this.photosRandom.pop();
      }
      console.log("P1: "+this.photosRandom)
      p2.subscribe(res2 => {
        loading.dismiss();
        this.photosRandom2 = res2;
        var n = 0;
        console.log("P2"+ res2);
        for(var i=0; i < this.numPhotosArray2;i++){
          this.photosRandom.push(this.photosRandom2[i]);
          console.log(i+" array: "+this.photosRandom);
        }
        
        this.shuffle(this.photosRandom);
      })
      

    })

  }

  //Funcion que pone fotos aleatorias de la persona y otras que no son de la persona
  shuffle(obj: Photo[]) {
    var j, x, i;
    console.log("longitu obj: "+ obj.length);
    for (i = obj.length-1; i > 0; i--) {
      j = Math.round(Math.random() * (i + 1));
      x = obj[i];
      console.log("i "+i+" j "+j+" x "+x);
      obj[i] = obj[j];
      obj[j] = x;
    }
  }


  imageUrl:Photo;
  verImagen(imagen: Photo) {
    this.imageUrl=imagen;
    this.cuestionarioImagen(this.imageUrl); 
  }
  //CUESTIONARIO ES TU FAMILIAR
  async cuestionarioImagen(imagen: Photo){
    this.DateP12=new Date;
    const alert = await this.alertController.create({
      header: 'Es miembro de tu familia?',
      message: `<img src="${imagen.urlImage}" class="card-alert">`,
      buttons: [{
        text:'Si',
        handler:()=>{
          console.log("id: "+ this.personId+ " imagen: "+imagen.person.id)
          if(imagen.person.id == this.personId){
            var i = this.photosRandom.indexOf( imagen );
            this.photosRandom.splice(i,1);
            this.photosOrdenadas.push(imagen);
            //IR A SIGUIENTE PREGUNTA
            this.muyBien(imagen);
          }
          else{
            //IR A ALERTA DE ERROR, se borra la foto
            this.ErrorNoEsFamiliar(imagen);
            var i = this.photosRandom.indexOf( imagen );
            this.photosRandom.splice(i,1);
          }
        }
      },{
        text:'No',
        handler:()=>{
          if (imagen.person.id == this.personId) {
            //error esta persona si es tu familiar e ir al cuestionario 2
            var i = this.photosRandom.indexOf( imagen );
            this.photosRandom.splice(i,1);
            this.photosOrdenadas.push(imagen);
            this.ErrorSiEsFamiliar(imagen);
          } else {
            //alerta de muy bien! y que siga jugando, se borra la foto
            var i = this.photosRandom.indexOf( imagen );
            this.photosRandom.splice(i,1);
            
            this.muyBienNo(imagen);
          }
          }

      },
      ]
  
    });
    await alert.present();
    alert.backdropDismiss=false;
    let result = await alert.onDidDismiss();
  }

  // CUESTIONARIO DE QUIEN ES PARA TI
  async cuestionarioImagen2(imagen: Photo){
    //aleatoreo para obtener las descripciones por el array
    do{
    var a1 = Math.round(Math.random()*(this.arrayDescripciones.length - 1));  
    var a2 = Math.round(Math.random()*(this.arrayDescripciones.length - 1));
    }while(a1==a2 || this.arrayDescripciones[a1]==imagen.description || this.arrayDescripciones[a2]==imagen.description )
    console.log("desca1: "+ this.arrayDescripciones[a1] + " desca2: "+ this.arrayDescripciones[a2] + " des: "+ imagen.description);
    //guardar las opciones que se sacaron en un nuevo array para poner aleatoreamente en los radio button

    var arrayDescAle : any []=[this.arrayDescripciones[a1],this.arrayDescripciones[a2],imagen.description];

    do{
      var ale1 = Math.round(Math.random()*(arrayDescAle.length - 1));  
      var ale2 = Math.round(Math.random()*(arrayDescAle.length - 1));
      var ale3 = Math.round(Math.random()*(arrayDescAle.length - 1));
      }while(ale1==ale2 || ale2==ale3 || ale3==ale1 )
      console.log("ale1: "+ ale1 + " desca2: "+ ale2 + " des: "+ ale3);

      const alert = await this.alertController.create({
        header: 'Esta persona es tu?',
        message: `<img src="${imagen.urlImage}" class="card-alert">`,
        inputs:[{
            name: 'radio1',
            type: 'radio',
            label: `${arrayDescAle[ale1]}`,
            value: `${arrayDescAle[ale1]}`,
        },{
          name: 'radio2',
          type: 'radio',
          label: `${arrayDescAle[ale2]}`,
          value: `${arrayDescAle[ale2]}`,
        },{
          name: 'radio3',
          type: 'radio',
          label: `${arrayDescAle[ale3]}`,
          value: `${arrayDescAle[ale3]}`,
        }],
        buttons: [{
          text:'Continuar', //deben estar los radio button
          handler:(data)=>{
            if(data==imagen.description){
              //muy bien vamos al siguiente cuestionario
              this.muyBienParentesco(imagen,data);
            }else{
              //volver a este cuestionario pero son un error
              this.QuetipodeFamiliar(imagen,data);
              console.log("DEBE VOLVER A INTENTAR");
            }
          }
        },
        ]
    
      });
      await alert.present();
      alert.backdropDismiss=false;
      let result = await alert.onDidDismiss();
    }
  
    async cuestionarioImagen3(imagen: Photo){

      //aleatoreo para obtener los nombres por el array

      do{
      var a1 = Math.round(Math.random()*(this.arrayNombres.length - 1));  
      var a2 = Math.round(Math.random()*(this.arrayNombres.length - 1));
      }while(a1==a2 || this.arrayNombres[a1]==imagen.name || this.arrayNombres[a2]==imagen.name )
      console.log("desca1: "+ this.arrayNombres[a1] + " desca2: "+ this.arrayNombres[a2] + " des: "+ imagen.name);
      //guardar las opciones que se sacaron en un nuevo array para poner aleatoreamente en los radio button
  
      var arrayNomAle : any []=[this.arrayNombres[a1],this.arrayNombres[a2],imagen.name];
  
      do{
        var ale1 = Math.round(Math.random()*(arrayNomAle.length - 1));  
        var ale2 = Math.round(Math.random()*(arrayNomAle.length - 1));
        var ale3 = Math.round(Math.random()*(arrayNomAle.length - 1));
        }while(ale1==ale2 || ale2==ale3 || ale3==ale1 )
        console.log("ale1: "+ ale1 + " desca2: "+ ale2 + " des: "+ ale3);
  
        const alert = await this.alertController.create({
          header: 'Cuál es el nombre de esta persona?',
          message: `<img src="${imagen.urlImage}" class="card-alert">`,
          inputs:[{
              name: 'radio1',
              type: 'radio',
              label: `${arrayNomAle[ale1]}`,
              value: `${arrayNomAle[ale1]}`,
          },{
            name: 'radio2',
            type: 'radio',
            label: `${arrayNomAle[ale2]}`,
            value: `${arrayNomAle[ale2]}`,
          },{
            name: 'radio3',
            type: 'radio',
            label: `${arrayNomAle[ale3]}`,
            value: `${arrayNomAle[ale3]}`,
          }],
          buttons: [{
            text:'Continuar', //deben estar los radio button
            handler:(data)=>{
              if(data==imagen.name){
                //muy bien vamos al siguiente cuestionario
                this.muyBienNombre(imagen,data);
              }else{
                //volver a este cuestionario pero son un error
                this.ErrorNoEsNombre(imagen,data);
                console.log("DEBE VOLVER A INTENTAR");
              }
            }
          },
          ]
      
        });
        await alert.present();
        alert.backdropDismiss=false;
        let result = await alert.onDidDismiss();
      }

    //PRIMER ERROR
  async ErrorNoEsFamiliar(imagen: Photo){
    const alert = await this.alertController.create({
      header: 'Es miembro de tu familia?',
      message: 'La persona selecionada no es tu familiar, sigue participando',
      buttons: [{
        text:'Siguiente',
        handler:()=>{
          //this.errores= this.errores+1;
          this.errores++;
          console.log("hola");
          this.DateP11 = new Date;
        this.DateP13 = ((this.DateP11 - this.DateP12) / 1000);
        //this.tiempoP1 = this.tiempoP1 + this.myDate6;
        this.myDate = new Date();
        this.mes = this.myDate.getMonth()+1;
        this.dia = this.myDate.getDate();
        this.anio = this.myDate.getFullYear();
        this.horajuego = this.myDate.getHours() + ':' + this.myDate.getMinutes() + ':' + this.myDate.getSeconds();
        console.log(this.DateP33  + "segundos");
        this.familiaresData = new familiaresDatos("this.personId",this.horajuego,this.DateP13,0,0,this.errores,this.aciertos);
        this.insertarDatosBase(this.familiaresData);
        this.aciertos=0;
        this.errores=0;
        }
      },
      ]
  
    });
    await alert.present();
    alert.backdropDismiss=false;
    let result = await alert.onDidDismiss();
  }
  //ERROR LA PERSONA SI ES TU FAMILIAR
  async ErrorSiEsFamiliar(imagen: Photo){
    const alert = await this.alertController.create({
      header: 'Es miembro de tu familia?',
      message: 'Upsi, la persona selecionada si es tu familiar, vamos a la siguiente ronda',
      buttons: [{
        text:'Siguiente',
        handler:()=>{
          this.errores++;
          this.DateP22=new Date;
          this.cuestionarioImagen2(imagen);
        }
      },
      ]
  
    });
    await alert.present();
    alert.backdropDismiss=false;
    let result = await alert.onDidDismiss();
  }
//CUANDO RESPONDE BIEN LA PREGUNTA
async muyBien(imagen: Photo){
  const alert = await this.alertController.create({
    header: 'Es miembro de tu familia?',
    message: 'MUY BIEN, vamos a la siguiente ronda',
    buttons: [{
      text:'Siguiente',
      handler:()=>{
        this.aciertos++;
        this.DateP11 = new Date;
        this.DateP13 = ((this.DateP11 - this.DateP12) / 1000);
        //this.tiempoP1 = this.tiempoP1 + this.myDate6;
        console.log(this.DateP13  + "segundos");
        this.DateP22=new Date;
        this.cuestionarioImagen2(imagen);
      }
    },
    ]

  });
  await alert.present();
  alert.backdropDismiss=false;
  let result = await alert.onDidDismiss();
}

//MUY BIEN NO ES TU FAMILIAR
//CUANDO RESPONDE BIEN LA PREGUNTA
async muyBienNo(imagen: Photo){
  const alert = await this.alertController.create({
    header: 'Es miembro de tu familia?',
    message: 'MUY BIEN, la persona no es tu familiar, continuemos con otra foto',
    buttons: [{
      text:'Siguiente',
      handler:()=>{
        this.aciertos++;
        this.DateP11 = new Date;
        this.DateP13 = ((this.DateP11 - this.DateP12) / 1000);
        //this.tiempoP1 = this.tiempoP1 + this.myDate6;
        console.log(this.DateP13  + "segundos");
      }
    },
    ]

  });
  await alert.present();
  alert.backdropDismiss=false;
  let result = await alert.onDidDismiss();
}

//ERROR PARENTESCO CUESTIONARIO 2
async QuetipodeFamiliar(imagen: Photo, tipo : any){
  const alert = await this.alertController.create({
    header: 'Esta persona es tu?',
    message: `Upsi, la persona selecionada no es tu ${tipo}, intenta de nuevo`,
    buttons: [{
      text:'Nuevo Intento',
      handler:()=>{
        this.errores++;

      this.cuestionarioImagen2(imagen);
      }
    },
    ]

  });
  await alert.present();
  alert.backdropDismiss=false;
  let result = await alert.onDidDismiss();
}
//CUANDO RESPONDE BIEN LA PREGUNTA DEL PARENTESCO
async muyBienParentesco(imagen: Photo,tipo:any){
  const alert = await this.alertController.create({
    header: 'Cuál es el nombre de esta persona??',
    message: `MUY BIEN la persona es tu ${tipo}, vamos a la siguiente ronda`,
    buttons: [{
      text:'Siguiente',
      handler:()=>{
        this.aciertos++;
        this.cuestionarioImagen3(imagen);
        this.DateP21 = new Date;
        this.DateP23 = ((this.DateP21 - this.DateP22) / 1000);
        //this.tiempoP1 = this.tiempoP1 + this.myDate6;
        this.DateP32=new Date;
        console.log(this.DateP23  + "segundos");
      }
    },
    ]

  });
  await alert.present();
  alert.backdropDismiss=false;
  let result = await alert.onDidDismiss();
}

//ERROR Nombre CUESTIONARIO 3
async ErrorNoEsNombre(imagen: Photo, nombre : any){
  const alert = await this.alertController.create({
    header: 'Cuál es el nombre de esta persona?',
    message: `Upsi, la persona selecionada no se llama ${nombre}, intenta de nuevo`,
    buttons: [{
      text:'Nuevo Intento',
      handler:()=>{
        this.errores++;
      this.cuestionarioImagen3(imagen);
      }
    },
    ]

  });
  await alert.present();
  alert.backdropDismiss=false;
  let result = await alert.onDidDismiss();
}

// RESPUESTA CORRETA EN NOMBRE
async muyBienNombre(imagen: Photo,nombre:any){
  const alert = await this.alertController.create({
    header: 'Esta persona es tu?',
    message: `MUY BIEN la persona se llama ${nombre}`,
    buttons: [{
      text:'Siguiente',
      handler:()=>{
        this.aciertos++;
        this.DateP31 = new Date;
        this.DateP33 = ((this.DateP31 - this.DateP32) / 1000);
        //this.tiempoP1 = this.tiempoP1 + this.myDate6;
        this.myDate = new Date();
        this.mes = this.myDate.getMonth()+1;
        this.dia = this.myDate.getDate();
        this.anio = this.myDate.getFullYear();
        this.horajuego = this.myDate.getHours() + ':' + this.myDate.getMinutes() + ':' + this.myDate.getSeconds();
        console.log(this.DateP33  + "segundos");
        this.familiaresData = new familiaresDatos("this.personId",this.horajuego,this.DateP13,this.DateP23,this.DateP33,this.errores,this.aciertos);
        this.insertarDatosBase(this.familiaresData);
        this.aciertos=0;
        this.errores=0;

      }
    }, 
    ]

  });
  await alert.present();
  alert.backdropDismiss=false;
  let result = await alert.onDidDismiss();

}

insertarDatosBase(datosFam:familiaresDatos){
  this.famDatos.crearTiempo(datosFam);
}

}
