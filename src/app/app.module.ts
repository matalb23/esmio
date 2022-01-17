import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from  './auth/auth.module';
import {interceptorProvider}  from './service/api-interceptor.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { AuthService } from '../app/auth/auth.service';
import { Router } from  "@angular/router";
import {TokenService} from '../app/service/token.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AuthModule, FormsModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    interceptorProvider, // añadimos el interceptor en providers
    FCM,
    BarcodeScanner,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
constructor(public auth:AuthService,private  router:  Router,public token:TokenService,private fcm: FCM){
  this.initialiseApp();
}

private initialiseApp() {
  //console.log("module:this.token.getUserName:"+this.token.getUserName())
//this.GuardarTokenFcm();


}
}
