import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Nivel2Page } from './nivel2.page';

const routes: Routes = [
  {
    path: '',
    component: Nivel2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Nivel2PageRoutingModule {}
