import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { PhotoService } from '../../app/services/photo.service';
import { Photo } from '../models/photo';
import { Subscriber } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './linea-tiempo.page.html',
  styleUrls: ['./linea-tiempo.page.scss'],
})
export class LineaTiempoPage implements OnInit {

  selectQuadrant = 'photosDefinitivas';


  personId = null;
  photos: Photo[] = [];
  photosOrdenadas: Photo[] = [];
  photosDefinitivas: Photo[] = [];
  arrayNumeros: number[]=[];

  constructor(public alertController: AlertController,private route: ActivatedRoute, private router: Router, public photoService: PhotoService,
    private loadingController: LoadingController, private dragulaService: DragulaService, private toas: ToastController,
    private modalControl: ModalController) {
    //Drag&Drop
    this.dragulaService.drag("dragula_band")
      .subscribe(({ el}) => {
        el.setAttribute('urlImage', '');
      });
  }

  ngOnInit() {
    this.personId = this.route.snapshot.params['id'];
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
    const p = this.photoService.getPhotosByIdPerson(113,this.personId);
    console.log('result' + p);
    p.subscribe(res => {
      loading.dismiss();
      this.photosDefinitivas = res;
      var n = 0;
      /*for (const prop in this.photos) {
        //  console.log(`photo.${prop} = ${this.photos[prop]}`);

        var obj = this.photos[prop];
        var ObjSections = obj['sections'];
        for (const obj1 in ObjSections) {
          var objSection = ObjSections[obj1];
          //console.log("Section"+ objSection['name']+);
          if (objSection['name'] == 'Puzzle') {
            this.photosDefinitivas[n] = obj;
            this.arrayNumeros[n]=n+1;
            n = n + 1;
          }
        }

      }*/
      this.shuffle(this.photosDefinitivas);

    }
    )
  }
  //Funcion que pone en posiciones aleatorias a los elementos de un objeto
  shuffle(obj) {
    var j, x, i;
    for (i = obj.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = obj[i];
      obj[i] = obj[j];
      obj[j] = x;
    }
  }
  imageUrl:String;
  verImagen(imagen) {
    this.imageUrl=imagen;
    this.presentAlertPrompt(); 
  }

  async presentAlertPrompt(){
    let alert =await this.alertController.create({
      message: `<img src="${this.imageUrl}" class="card-alert">`,      
      buttons: [
         {
          text: 'OK', 
          handler: (data) => {
            console.log('Confirma Ok');
          }
        }
      ],

    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }

}
