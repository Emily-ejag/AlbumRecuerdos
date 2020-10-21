import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineaTiempoPage } from './seleccionImg.page';

const routes: Routes = [
  {
    path: '',
    component: LineaTiempoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineaTiempoPageRoutingModule {}
