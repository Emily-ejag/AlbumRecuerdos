import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'datos',
    loadChildren: () => import('./datos/datos.module').then( m => m.DatosPageModule)
  },
  {
    path: 'detail-person/:id',
    loadChildren: () => import('./detail-person/detail-person.module').then( m => m.DetailPersonPageModule)
  },
  {
    path: 'datos/:id',
    loadChildren: () => import('./datos/datos.module').then( m => m.DatosPageModule)
  },
  {
    path: 'detail-person',
    loadChildren: () => import('./detail-person/detail-person.module').then( m => m.DetailPersonPageModule)
  },
  {
    path: 'linea-tiempo',
    loadChildren: () => import('./linea-tiempo/linea-tiempo.module').then( m => m.LineaTiempoPageModule)
  },
  {
    path: 'linea-tiempo/:id',
    loadChildren: () => import('./linea-tiempo/linea-tiempo.module').then( m => m.LineaTiempoPageModule)
  },
  {
    path: 'familiares',
    loadChildren: () => import('./familiares/familiares.module').then( m => m.FamiliaresPageModule)
  },
  {
    path: 'nivel1',
    loadChildren: () => import('./nivel1/nivel1.module').then( m => m.Nivel1PageModule)
  },
  {
    path: 'nivel2',
    loadChildren: () => import('./nivel2/nivel2.module').then( m => m.Nivel2PageModule)
  },
  {
    path: 'seleccionImg',
    loadChildren: () => import('./seleccionImg/seleccionImg.module').then( m => m.LineaTiempoPageModule)
  },
  {
    path: 'seleccionImg/:id',
    loadChildren: () => import('./seleccionImg/seleccionImg.module').then( m => m.LineaTiempoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
