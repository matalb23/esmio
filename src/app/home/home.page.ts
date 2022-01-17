
import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import {TokenService} from '../service/token.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from  '../auth/usuario';
import {ApiService} from '../service/api.service';
import { FCM } from '@ionic-native/fcm/ngx';
import {AlertService} from '../service/alertionic.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls:  ['home.page.scss'],
})

  export class HomePage implements OnInit {
    usuario=this.token.getNombreUsuario();
  constructor( private  router:  Router,public token:TokenService,private  authService:  AuthService,private apiservice:ApiService,private fcm: FCM,public alert:AlertService) {
    
      if( this.token.getUserName()!=environment.ltk_user)
      {
    this.usuario=this.token.getNombreUsuario();//this.token.getUserName();
  






  }
      else{this.usuario="";}

  }
  ionViewDidEnter(){   
    

   this.usuario=this.token.getNombreUsuario();


   this.apiservice.obtenerUsuario(this.token.getUserName()).subscribe((data)=> {
    console.log(".Nombre de usuario " + data.name);
    this.usuario=data.name;
    this.token.setNombreUsuario(data.name);
    }
,
(err: any) => {
    //this.loading.dismiss();
    console.log("Error:");

}
);





   console.log("this.usuario:"+this.usuario);
  }
  ngOnInit() {


   
   if( this.token.getUserName()==environment.ltk_user)
    {
      this.authService.logout();
     this.router.navigateByUrl('login');  
    }

    this.authService.isLoggedIn().subscribe((state)=>{
      if(state) {
        this.usuario=this.token.getNombreUsuario();//this.token.getUserName();
        console.log("home logged in");

      } else {
                console.log("entro a no logueado");
                  this.token.setAgregarBeader("true");
                  
                    console.log("entro a re login por token");
                    var user={} as Usuario;
                    user.login=this.token.getUserName();
                    user.pswd=this.token.getUserPass();

                    this.token.setAgregarBeader("false");
                    
                    this.authService.login(user).subscribe((res)=>{      

                      this.token.setAgregarBeader("true");
                      console.log("Agrego el bearer by login:"+this.token.getToken());       
               
                    }
                    ,error=>{this.router.navigateByUrl('login');  }
                    );
               
                  console.log("this.token.getToken:"+this.token.getToken());      

      }
    });
    
  }
  irCargarObjetos(){
    //this.router.navigateByUrl('cargar-objetos');  
    this.router.navigate(['/cargar-objetos']);
  }
  irMisAvisos(){
    this.router.navigate(['/misavisos']);//this.router.navigateByUrl('misavisos');  
  }
  irMisObjetos(){
    this.router.navigate(['/grupo']);
    
  }

  irPerfil(){ 
    //this.router.navigateByUrl('perfil');  
    this.router.navigate(['/perfil']);
  }
  romper(){
    /*this.token.setUserName(null);
    this.token.setUserPass(null);*/
    this.token.setToken(null);
   // this.router.navigateByUrl('login');  
  }
  
  
  guardartoken()
  {
    /*this.authService.isLoggedIn().subscribe((state)=>{
      if(state) {*/

    var token=this.token.getTokenFCM();
    if(token!=null)
    {
        var cliente="a";

//        if (this.platform.is('android')) {
  //        cliente="a";
    //    } else if (this.platform.is('ios')) {
      //    cliente="i";
        //} else {
        //  cliente="w";
          // fallback to browser APIs
        //}

        this.token.setAgregarBeader("true");
        var parametros = {
          login:this.token.getUserName(),
          mobile_token: token,
          mobile_so:cliente      };
        this.apiservice.GuardarToken(parametros).subscribe(data => {

         console.log("token so:" +cliente+ " token:"+token);
              this.apiservice.log("200","login","token so:" +cliente+ " token:"+token);
            
          },
            (err: any) => {     
              
              var respuesta=JSON.parse(JSON.stringify(err));   
       
              switch(true) {
                case respuesta.message.includes('Http failure response'):
                  this.alert.presentAlert("UPS!","", "Detectamos problemas de conexión. No podemos guardar el TOKEN. Tenés internet o datos activos?");
                   break;
                default:
                  alert(JSON.stringify(err));
                  
              }
               
            }
          );
        
    }
  }

/*});

}*/
  
}
