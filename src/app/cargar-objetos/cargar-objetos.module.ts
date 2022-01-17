import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CargarObjetosPage } from './cargar-objetos.page';

const routes: Routes = [
  {
    path: '',
    component: CargarObjetosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CargarObjetosPage]
})
export class CargarObjetosPageModule {}
