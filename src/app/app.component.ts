
import { Component, ViewChild } from '@angular/core';
import { Usuario } from  './auth/usuario';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import {ApiService} from '../app/service/api.service';
import {TokenService} from '../app/service/token.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    private apiservice:ApiService,
    private token:TokenService,
    private  authService:  AuthService,
   
  ) {
    this.token.setPaginaInicio("home");
    this.initializeApp();


  }

  initializeApp() {
   
    this.platform.ready().then(() => {
    this.GuardarTokenFcm();
  });
}

GuardarTokenFcm()
  {    
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        
        console.log(JSON.stringify(data));
        
        this.token.setAgregarBeader("true");
        this.token.setPaginaInicio("misavisos");
        this.router.navigateByUrl('misavisos');  
        
      } else {
        
        console.log(JSON.stringify(data));
      }
    });

    
  

  // this.apiservice.log("200","Token:","getToken entrando:");
  // console.log("Token getToken entrando:");
  this.fcm.getToken().then(token => {
    //this.apiservice.log("200","Token:","getToken:" + token);
    // console.log("this.fcm.getToken :");
    // console.log(token);
    this.token.setTokenFCM(token);
    
  });

  this.fcm.onTokenRefresh().subscribe(token => {
   // this.apiservice.log("200","Token:","onTokenRefresh:" + token);
    this.token.setTokenFCM(token);
    console.log(token);
    
  });

  }
}
