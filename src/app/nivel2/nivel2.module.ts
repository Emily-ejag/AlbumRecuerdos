import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Nivel2PageRoutingModule } from './nivel2-routing.module';
import { DraggableModule } from '../draggable/draggable.module';
import { Nivel2Page } from './nivel2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DraggableModule,
    Nivel2PageRoutingModule
  ],
  declarations: [Nivel2Page]
})
export class Nivel2PageModule {}
