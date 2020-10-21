import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamiliaresPageRoutingModule } from './familiares-routing.module';

import { FamiliaresPage } from './familiares.page';

import {DragulaModule} from 'ng2-dragula';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamiliaresPageRoutingModule,
    DragulaModule.forRoot()
  ],
  declarations: [FamiliaresPage]
})
export class FamiliaresPageModule {}
