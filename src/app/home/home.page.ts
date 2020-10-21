import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PersonService } from '../../app/services/person.service';
import { MatchService } from '../../app/services/match.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Person } from '../models/person';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  classPerson: Person;
  cedula:string;
  constructor(public alertController: AlertController,private restPerson: PersonService,private restMatch: MatchService,
    private activatedRoute: ActivatedRoute,private router:Router,private toastController: ToastController,) {
      this.classPerson = new Person();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ingrese Su Cedula Nuevamente',
      duration: 2000
    });
    toast.present();
  }
  async presentToast1() {
    const toast = await this.toastController.create({
      message: 'Cedula No Registrada',
      duration: 2000
    });
    toast.present();
  }

  respMatch(id:any,auxCedula:any,self) {
      var dato =this.restMatch.getCountMatch(id);
      dato.forEach(function (value) {
        if(value>0){
          self.router.navigate(['/detail-person',auxCedula]);
        }else{
          self.router.navigate(['/datos',auxCedula]);
          
        }  
      });
  }

  async nextStep(){
    
    if(this.cedula.length>9 && this.cedula.length<11){
      const p=this.restPerson.getPersonNumber(this.cedula);
      p.subscribe(res=> {
        this.classPerson=res;
        if(this.classPerson!=null){
          let self=this;
          //llama para contar el numero de match de tipo 'Datos Personales' y si es cero manda a otra pantalla
          this.respMatch(this.classPerson.id,this.cedula,self);
          
        }else{
          this.presentToast1();    
        }
      })
    }else{
      this.presentToast();
    }
  } 
  
  async presentAlertPrompt() {
    let alert = await this.alertController.create({
      header: 'Ingrese su numero de Cedula',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Número de Cedula'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {    
            console.log('Confirma Cancelar');
          }
        }, {
          text: 'Verificar', 
          handler: (data) => {
            data.completed=false;
            let p= this.restPerson.getPersonNumber(data)
            p.toPromise().then(
              response=>{
                this.cedula=data;
              })
              .catch( error=> {
                this.presentToast();
                this.cedula="";
              })
            console.log('Confirma Ok');
          }
        }
      ]
    });

    await alert.present();

    

  }
 
}


