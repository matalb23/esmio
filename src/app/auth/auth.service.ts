import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { Usuario } from  './../auth/usuario';
import { AuthResponse } from  './auth-response';
import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'
import {TokenService} from '../service/token.service';
import { Platform } from '@ionic/angular';
import {ApiService} from '../service/api.service';
import {LoadingService} from '../service/loading.service ';
import { Router } from  "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  = environment.urlEsmioApi; 
  authSubject  =  new  BehaviorSubject(false);
  constructor(private  httpClient:  HttpClient, private  storage:  Storage,private token:TokenService,
    private platform: Platform,
    private apiservice:ApiService,
    public loading: LoadingService,
     private  router:  Router,
    ) { }

  

  login(user: Usuario): Observable<AuthResponse> {
    this.loading.present();   
    //this.logout();
    //this.token.setAgregarBeader("false");// AgregarBeader
    console.log("usuario en login:"+ user.login+" pass:"+user.pswd);
    this.token.setUserName(user.login);
    this.token.setUserPass(user.pswd);
    //this.token.setToken(null);
    var data = "grant_type=password&UserName=" + user.login   + "&Password=" + user.pswd   + "&client_id=_Latika1234$_";

    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/token`,data).pipe(
       tap(async (res: AuthResponse) => {
        this.loading.dismiss();
  
        if (res.access_token) {
          this.authSubject.next(true);
          
          this.token.setAgregarBeader("true");// AgregarBeader
          await this.storage.set("EXPIRES_IN", res.expires_in);
          this.token.setToken(res.access_token);
          
          this.token.setUserName(user.login);
          this.token.setUserPass(user.pswd);
         
          this.guardartoken();//fcm
          //this.getUsuario(user.login);

         
        }
        else{
          this.loading.dismiss();
          this.authSubject.next(false);
          console.log("funcion login fue al else");
        }
      }     )
    );

    
  }



  registrar(user: Usuario): Observable<AuthResponse>
   {     
    this.loading.present();
    var redir="";
    return  this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/usuario`,user).pipe(
    tap(async (res: AuthResponse) => {
          this.logout();
          var respuesta=JSON.parse(JSON.stringify(res)); 
          
          if (respuesta.estado=="error")
          {
            this.token.setUserName(null);
            this.token.setUserPass(null);
          }
          else
          {
            redir="home";
          }
          return     this.login(user).subscribe((res)=>{       ///loguea el nuevo si lo registro
            this.loading.dismiss();
            //this.getUsuario(user.login);
            if(redir!=""){
            this.router.navigateByUrl(redir);
            }
          });
  
 }     )
);
  }
  registroActualizar(user: Usuario): Observable<AuthResponse>
   {     
    this.loading.present();
    var redir="";
    return  this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/usuario`,user).pipe(
    tap(async (res: AuthResponse) => {
          //this.logout();
          var respuesta=JSON.parse(JSON.stringify(res)); 
          
          if (respuesta.estado=="error")
          {
            this.token.setUserName(null);
            this.token.setUserPass(null);
          }
          else
          {
            redir="home";
          }
          // return     this.login(user).subscribe((res)=>{       ///loguea el nuevo si lo registro
          //   this.loading.dismiss();
          //   if(redir!=""){
          //   this.router.navigateByUrl(redir);
          //   }
          // });
  
 }     )
);
  }



  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    await this.storage.remove("USER_NAME");
    await this.storage.remove("USER_PASS");
    this.authSubject.next(false);
  }

  isLoggedIn() {

return this.authSubject.asObservable();

  }

  
  guardartoken()
  {
    var token=this.token.getTokenFCM();
    if(token!=null)
    {
        var cliente="";

        if (this.platform.is('android')) {
          cliente="a";
        } else if (this.platform.is('ios')) {
          cliente="i";
        } else {
          cliente="w";
          // fallback to browser APIs
        }
        this.token.setAgregarBeader("true");
        var parametros = {
          login:this.token.getUserName(),
          mobile_token: token,
          mobile_so:cliente      };
        this.apiservice.GuardarToken(parametros).subscribe(data => {
         
          this.apiservice.log("200","login","token so:" +cliente+ " token:"+token);
            
          },
            (err: any) => {
                alert("this.apiservice.GuardarToken:"+JSON.stringify(err));
            }
          );
        
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

