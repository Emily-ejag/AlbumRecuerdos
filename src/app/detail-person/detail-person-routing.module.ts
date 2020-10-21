import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPersonPage } from './detail-person.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPersonPageRoutingModule {}
