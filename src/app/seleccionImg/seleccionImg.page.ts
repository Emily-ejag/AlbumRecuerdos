import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { URL_CONFIG } from './Variable';

@Component({
  selector: 'app-linea-tiempo',
  templateUrl: './seleccionImg.page.html',
  styleUrls: ['./seleccionImg.page.scss'],
})
export class LineaTiempoPage implements OnInit {

  selectQuadrant = 'photosDefinitivas';
  seleccionImage = false;
  imageUrl:any;
  personId = null;
  photos: Photo[] = [];
  photosDefinitivas: Photo[] = [];

  constructor(public alertController: AlertController,private route: ActivatedRoute, private router: Router, public photoService: PhotoService,
    private loadingController: LoadingController, private toas: ToastController,
    private modalControl: ModalController) {
    
    
  }

  ngOnInit() {
    //this.personId = this.route.snapshot.params['id'];
    this.personId = 145;
    console.log("Entra id: " + this.personId);
    if (this.personId) {
      this.loadPhotos();
    }
  }

  async loadPhotos() {
    const loading = await this.loadingController.create({
      message: 'OBTENIENDO IMAGENES'
    });
    await loading.present();
    const p = this.photoService.getPhotosByIdPerson(158,this.personId);
    console.log('result' + p);
    p.subscribe(res => {
      loading.dismiss();
      this.photosDefinitivas = res;
      this.shuffle(this.photosDefinitivas);

    })
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
  
  verImagen(imagen) {
    this.imageUrl=imagen;
    this.presentAlertPrompt(); 
    console.log(this.imageUrl);
    URL_CONFIG.launchUrl = this.imageUrl;
    console.log('SELECT '+URL_CONFIG.launchUrl);
  }

  async presentAlertPrompt(){
    let alert =await this.alertController.create({
      message: `<img src="${this.imageUrl}" class="card-alert">`,      
      buttons: [
         {
          text: 'SELECCIONAR IMAGEN', 
          handler: (data) => {
            console.log('Confirma Ok');
          }
        }
      ],
    });
    this.seleccionImage = true;
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }
  
  comprobarImagen(){
    if(this.seleccionImage == true){
      return true;
    }else{
      alert("DEBE SELECCIONAR UNA IMAGEN");
      return false;
    }
  }

}
