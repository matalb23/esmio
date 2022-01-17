

import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import {TokenService} from '../../service/token.service';
import { AuthService } from '../../auth/auth.service';
import { Usuario } from  '../../auth/usuario';
import {ApiService} from '../../service/api.service';
import { FCM } from '@ionic-native/fcm/ngx';
import {AlertService} from '../../service/alertionic.service';
import { environment } from 'src/environments/environment';
import {LoadingService} from '../../service/loading.service ';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario=this.token.getUserName();
  constructor( private  router:  Router,public token:TokenService,private  authService:  AuthService,private apiservice:ApiService,private fcm: FCM,public alert:AlertService,public loading: LoadingService) {
    
      if( this.token.getUserName()!=environment.ltk_user)
      {
    this.usuario=this.token.getUserName();
      }
      else{this.usuario="";}

  }

  ngOnInit() {
    
   this.usuario=this.token.getUserName();
   console.log("this.usuario:"+this.usuario);
   
   if( this.token.getUserName()==environment.ltk_user)
    {
      this.authService.logout();
      this.loading.dismiss();
     this.router.navigateByUrl('login');  
    }
else{
    
    this.authService.isLoggedIn().subscribe((state)=>{
      if(state) {
       // this.getUsuario(this.token.getUserName());
        this.usuario=this.token.getUserName();
        console.log("home logged in");
        this.router.navigateByUrl('home'); 

      } else {
                console.log("entro a no logueado");
                  this.token.setAgregarBeader("true");
                  
                    console.log("entro a re login por token");
                    var user={} as Usuario;
                    user.login=this.token.getUserName();
                    user.pswd=this.token.getUserPass();

                    this.token.setAgregarBeader("false");
                    
                    this.authService.login(user).subscribe((res)=>{   
                      //this.getUsuario(this.token.getUserName());   
                      this.router.navigateByUrl('home'); 
                      this.token.setAgregarBeader("true");
                      console.log("Agrego el bearer by login:"+this.token.getToken());       
               
                    }
                    ,error=>{
                      this.loading.dismiss();
                      this.router.navigateByUrl('login');  }
                    );
               
                  console.log("this.token.getToken:"+this.token.getToken());      

      }
    });
    
  }
}

// getUsuario(login){ 
//   this.apiservice.obtenerUsuario(login).subscribe((data)=> {
//         console.log(".Nombre de usuario " + data.name);
//         this.token.setNombreUsuario(data.name);
//         }
//   ,
//     (err: any) => {
//         this.loading.dismiss();
//         console.log("Error:");

//     }
//   );
  
// }  

}
