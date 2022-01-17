import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import {TokenService} from '../../service/token.service';
import { Usuario } from  './../../auth/usuario';
import {AlertService} from '../../service/alertionic.service';
import {ApiService} from '../../service/api.service';
import {LoadingService} from '../../service/loading.service ';
import { Platform } from '@ionic/angular';
import {ValidacionesService} from '../../service/validaciones.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
   Usuario;
  login=this.token.getUserName();
  dni;
  phone;
  address;
  name;
  phone_cell;
  pswd;
  email;
  auto_envio_info;
  pais_codigo;
  phone_cell_formatted;
  constructor( private platform: Platform,private api:ApiService,public loading: LoadingService,private  authService:  AuthService, private  router:  Router,private token :TokenService,public alert:AlertService,private validar:ValidacionesService) { }
  ngOnInit() {
    this.platform.ready().then(() => {      
      this.getUsuario();
     
    });
    
  }


  guardar(form) {
//si la pass=blanco no la cambia
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
  
    
 
if (!valido)
{
  this.alert.presentAlert("Datos invalidos","",mensajeValidacion);//invalido
}
else//camino feliz
{

            form.value.login=this.login;
            this.authService.registroActualizar(form.value).subscribe((res) => {  
              
              var redir="";
              var respuesta=JSON.parse(JSON.stringify(res));               
              if (respuesta.estado=="ok")
              {
              this.alert.presentAlert("Se actualizó tu información con exito!","","");
              redir="home";
              
              }
              else
              { 
            
                if (respuesta.estado=="error")
                  {
                    switch(true) {
                      case respuesta.estadoDescripcion.includes('PRIMARY KEY'):
                        this.alert.presentAlert("UPS!","", form.value.name + " no está disponible.");
                         break;
                      case respuesta.estadoDescripcion.includes('UNIQUE KEY'):
                          this.alert.presentAlert("UPS!","", form.value.name + " no está disponible.");
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
            }
          
          
  }
  irHome(){     
    this.router.navigate(['/home']);
  }
  getUsuario(){ 
    //this.pais_codigo="AR";
        this.loading.present();
        
        this.api.obtenerUsuario(this.login).subscribe((data)=> {
            this.loading.dismiss();
            this.Usuario=data;
            this.dni=this.Usuario.dni;
            this.address=this.Usuario.address;
            this.phone=this.Usuario.phone;
            this.login=this.Usuario.login;
            this.name=this.Usuario.name;
            this.phone_cell=this.Usuario.phone_cell;
            this.pswd=this.Usuario.pswd;
            this.email=this.Usuario.email;
            this.auto_envio_info=this.Usuario.auto_envio_info;
            this.pais_codigo=this.Usuario.pais_codigo.trim();
            
//alert(this.pais_codigo);
              }
        ,
          (err: any) => {
              this.loading.dismiss();
              console.log("Error:");
    
          }
        );
        
      }
      
      
  
}
