import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPersonPageRoutingModule } from './detail-person-routing.module';

import { DetailPersonPage } from './detail-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPersonPageRoutingModule
  ],
  declarations: [DetailPersonPage]
})
export class DetailPersonPageModule {}
