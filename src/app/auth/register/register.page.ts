import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import {TokenService} from '../../service/token.service';
import { Usuario } from  './../../auth/usuario';
import {AlertService} from '../../service/alertionic.service';
import {environment} from '../../..//environments/environment';
import { Platform } from '@ionic/angular';
import {ValidacionesService} from '../../service/validaciones.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router,private token :TokenService,public alert:AlertService,private platform: Platform,private validar:ValidacionesService ) { 
  
  }
 // ngOnInit() {}

  ngOnInit() 
  {/*
    this.platform.ready().then(() => {
    
    }); */
  }
  ionViewDidEnter(){
    this.login();
  }
  login()
  {
    var userltk={} as Usuario;
    userltk.login=environment.ltk_user;
    userltk.pswd=environment.ltk_pswd;
    this.token.setUserName(environment.ltk_user);
    this.token.setUserPass(environment.ltk_pswd);
    this.authService.login(userltk).subscribe(async (res)=>{
            console.log("tokenlByregister:"+this.token.getToken());
          });
          
  }

  register(form) {
    let valido=true;
    let mensajeValidacion="";
    form.value.phone_cell_formatted=this.validar.CelularValidarFormatear(form.value);

    if(form.value.phone_cell_formatted=="")    {          
      mensajeValidacion="Verifique el numero de celular.";
      valido=false;
    }
    if(!this.validar.esEmailValido(form.value.email)){      
      mensajeValidacion+="<br>Verifique la casilla de email.";
      valido=false;
    }
    if(form.value.pswd!=form.value.confirmar){      
      mensajeValidacion+="<br>La contraseña es diferente a la confirmada.";
      valido=false;
    }
    
 
if (!valido)
{
  this.alert.presentAlert("Datos invalidos","",mensajeValidacion);//invalido
}
else//camino feliz
{
    var usualtk=environment.ltk_user;
    var passltk=environment.ltk_pswd;
    var userltk={} as Usuario;
    userltk.login=usualtk;
    userltk.pswd=passltk;
    this.token.setUserName(environment.ltk_user);
    this.token.setUserPass(environment.ltk_pswd);
          this.authService.login(userltk).subscribe(async (res)=>{
            
            
            this.token.setAgregarBeader("true");
           form.value.active="N";//para saber si agrega o actualiza
            this.authService.registrar(form.value).subscribe(async(res) => {  
             
              var redir="";
              var respuesta=JSON.parse(JSON.stringify(res)); 
              
              if (respuesta.estado=="ok")
              {              
                this.token.setNombreUsuario(form.value.name);
              //redir="login";              
              //redir="home";
              redir="inicio";
              }
              else
              { 
                this.token.setUserName(null);
                this.token.setUserPass(null);
                if (respuesta.estado=="error")
                  {
                    switch(true) {
                      case respuesta.estadoDescripcion.includes('PRIMARY KEY'):
                        this.alert.presentAlert("UPS!","", form.value.login + " no está disponible.");
                         break;
                      case respuesta.estadoDescripcion.includes('UNIQUE KEY'):
                          this.alert.presentAlert("UPS!","", form.value.login + " no está disponible.");
                           break;   
                      default:
                        this.alert.presentAlert("UPS!","","Consultá con tu administrador.");
                    }
                  }
              }
              if (redir!="")          {
                this.router.navigateByUrl(redir);        }
              }
              ,error=>{
                console.log(error);
              }
              );
           });
         
        }
  }
   
}