import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../app/services/person.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Person } from '../models/person';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {Platform} from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.page.html',
  styleUrls: ['./detail-person.page.scss'],
})
export class DetailPersonPage implements OnInit {
  classPerson: Person;
  personNumberId = null;
  constructor(private alertController: AlertController,private route: ActivatedRoute, private nav:NavController,
    private service:PersonService, private loadingController: LoadingController,private toastController: ToastController,
    private platform: Platform, private router:Router ) {
      this.platform=platform;
      this.classPerson=new Person();
     }
  //Carga los datos de la cedula que se ingreso en Home
  ngOnInit() {
    this.personNumberId=this.route.snapshot.params['id'];
    if(this.personNumberId){
      this.loadPerson();
    }else{
      this.presentAlert();
    }
  }
  //Recupera los datos del servicio y los coloca en el objeto persona para ser visualizados en la interface
  async loadPerson(){
    const loading=await this.loadingController.create({
      message:'Cargando.....'
    });
    await loading.present();
    const p=this.service.getPersonNumber(this.personNumberId);
    console.log('result'+p);

      p.subscribe(res=> {
        loading.dismiss();
        this.classPerson=res;
      })
    
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
  }
  
 //Muestra el mensaje antes de salir de la app
 async botonRegresar(){

  let alert = await this.alertController.create({
    header: '¿Seguro que desea salir?', 
    buttons: [
      {
        text: 'SI',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {    
          this.router.navigate(['/home']);
        }
      }, {
        text: 'NO', 
        handler: (data) => {
          console.log('Confirma NO');
        }
      }
    ]
  });

  await alert.present();  
}

  async botonEditar() {
    
    let alert = await this.alertController.create({
      header: '¿Está seguro que desea modificar sus datos?',
      buttons: [
        {
          text: 'SI',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/datos',this.classPerson.number_id]);
          }
        }, {
          text: 'NO',
          handler: (data) => {
            console.log('Confirma NO');
          }
        }
      ]   
    });

    await alert.present();
    

  }
}
