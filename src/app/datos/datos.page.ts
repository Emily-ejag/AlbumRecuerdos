import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../app/services/person.service';
import { MatchService } from '../../app/services/match.service';
import { SectionService } from '../../app/services/section.service';
import { Person } from '../models/person';
import { Match } from '../models/match';
import { Section } from '../models/section';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage {

  personNumberId = null;
  classPerson: Person;
  classMatch: Match;
  classSection: Section;

  persons: any;
  constructor(public rest: PersonService, private route: ActivatedRoute, private loadingController: LoadingController,
    private nav: NavController, private router: Router, public alertController: AlertController, public restMatch: MatchService,
    public restSection: SectionService) {
    this.classPerson = new Person();
    this.classMatch = new Match();
    this.classSection = new Section();
  }
  ngOnInit() {
    this.personNumberId = this.route.snapshot.params['id'];
    if (this.personNumberId) {
      this.loadPerson();
      //Tomo la fecha actual cuando se inicia la pagina para agregar datos
      this.classMatch.start = new Date();

    }
  }
  ionViewDidLoad() {
    this.rest.getPerson()
      .subscribe(
        (data) => { console.log(data); this.persons = data; },
        (error) => { console.error(error); }
      )
  }
  //
  async loadPerson() {
    const loading = await this.loadingController.create({
      message: 'Cargando.....'
    });
    await loading.present();
    const p = this.rest.getPersonNumber(this.personNumberId);
    p.subscribe(res => {
      loading.dismiss();
      this.classPerson = res;
    })
    console.log("Cedula: " + this.classPerson.id);
    console.log("numebrId: " + this.personNumberId);
    this.buscarSection();
  }
  //trae el objeto completo de section Datos Personas
  buscarSection() {
    const sec = this.restSection.getSectionByName("Datos Personales");
    sec.subscribe(res => {
      this.classSection = res;
    })
  }
  //Muestra el mensaje antes de salir de la app
  async botonRegresar() {

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
  async mensajeGuardar() {

    let alert = await this.alertController.create({
      header: 'Datos Guardados con Éxito!',

      buttons: [
        {
          text: 'OK',
          role: 'confirma',
          cssClass: 'primary',
          handler: () => {
            this.router.navigate(['/linea-tiempo', this.classPerson.id]);
          }
        }
      ]
    });

    await alert.present();
  }

  async onSave() {
    this.classMatch.end = new Date();
    var minutes = this.classMatch.start.getMinutes();
    var hours = this.classMatch.start.getHours();
    var seconds = this.classMatch.start.getSeconds();
    var minutes1 = this.classMatch.end.getMinutes();
    var hours1 = this.classMatch.end.getHours();
    var seconds1 = this.classMatch.end.getSeconds();
    var diffHor=(hours1-hours)*60;
    var diffMin=minutes1-minutes;
    if(diffMin<0){
      diffMin=(60-minutes+minutes1);
      diffHor=(hours1-hours-1)*60;
    }
    var diffSec=(seconds1-seconds)/60;
    if(diffSec<0){
      if(minutes>minutes1){
        diffMin=diffMin-1;
      }
      diffSec=(60-seconds+seconds1)/60;
    }
    var difTime=diffHor+diffMin+diffSec;
    
    this.classMatch.score = 0;
    this.classMatch.time = difTime;
    this.classMatch.person = this.classPerson;
    this.classMatch.section = this.classSection;
    if (this.classPerson.marital_status == "Soltero") {
      this.classPerson.date_marriage = null;
      this.classPerson.name_partner = null;
    }
    this.classPerson.registration_status = "Registrado";

    if (this.classPerson.number_id && this.classPerson.name && this.classPerson.date_bird && this.classPerson.name_father
      && this.classPerson.name_mother && this.classPerson.gender && this.classPerson.marital_status && this.classPerson.number_children) {
      this.rest.updatePerson(this.classPerson.id, this.classPerson).subscribe(response => {   //Hago update de los datos ingresados por el jugador      
        this.restMatch.addMatch(this.classMatch).subscribe(response => { //mando a guardar en match los datos de la partida
          this.mensajeGuardar();
        })
      }, (e) => {
        console.log("No se grabo hay un error");
      })
    } else {
      let alert = await this.alertController.create({
        header: 'Existen Campos Vacios',
        buttons: ['OK']
      });
      await alert.present();
    }

  }





}
