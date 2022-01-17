import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'cargar-objetos', loadChildren: './cargar-objetos/cargar-objetos.module#CargarObjetosPageModule' },
  { path: 'misavisos', loadChildren: './misavisos/misavisos.module#MisavisosPageModule' },
  { path: 'misobjetos', loadChildren: './misobjetos/misobjetos.module#MisobjetosPageModule' },   { path: 'devolver', loadChildren: './devolver/devolver.module#DevolverPageModule' },
  { path: 'perfil', loadChildren: './auth/perfil/perfil.module#PerfilPageModule' },
  { path: 'grupo', loadChildren: './grupo/grupo.module#GrupoPageModule' },
  { path: 'inicio', loadChildren: './auth/inicio/inicio.module#InicioPageModule' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
