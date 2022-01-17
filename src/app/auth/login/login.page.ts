import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import {TokenService} from '../../service/token.service';
import { Usuario } from  './../usuario';
import {AlertService} from '../../service/alertionic.service';
import { environment } from 'src/environments/environment';
import {LoadingService} from '../../service/loading.service ';
import {ApiService} from '../../service/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  constructor(private  authService:  AuthService, private  router:  Router
    ,private token :TokenService,public alert:AlertService    
    ,public loading: LoadingService 
    ,private api:ApiService
     ) { 
 
  

    }

  ngOnInit() {
    this.loading.dismiss();
  
    // if( this.token.getUserName()!=environment.ltk_user)
    // {
    //   this.authService.logout();
    // }

   
  }

  login(form){
    var user={} as Usuario;
    user=form.value;


    this.token.setUserName(user.login);
    this.token.setUserPass(user.pswd);
    this.authService.login(user).subscribe((res)=>{      
     // this.getUsuario(user.login);
      this.router.navigateByUrl(this.token.getPaginaInicio());
    }
    ,error=>{

      //this.alert.presentAlert("Error","","Por favor verifique los datos ingresados.");
      var respuesta=JSON.parse(JSON.stringify(error));   
       
      switch(true) {
        case respuesta.status==0:
          this.alert.presentAlert("UPS!","", "Detectamos problemas de conexión. Tenés internet o datos activos?.");
           break;
        case JSON.stringify(error).includes('invalid_grant'):   
          this.alert.presentAlert("UPS!","", "El nombre de usuario o constraseña es incorrecto.");
          break;
        default:

          alert(JSON.stringify(error));
          console.log("error de login "); 
          
      }
      // console.log("error de login ");
       console.log(error);
    }
    );
  
  }
  iraregistrar(  ){
    this.router.navigateByUrl('register');
  }
  getUsuario(login){ 
    this.api.obtenerUsuario(login).subscribe((data)=> {
          console.log(".Nombre de usuario " + data.name);
          this.token.setNombreUsuario(data.name);
          }
    ,
      (err: any) => {
          this.loading.dismiss();
          console.log("Error:");

      }
    );
    
  }  

 

}