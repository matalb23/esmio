import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objeto } from '../cargar-objetos/objeto';
import { Usuario } from '../auth/usuario';
import {Mensaje} from '../misavisos/mensaje';
import {environment} from '../../environments/environment';
import { TokenService } from '../service/token.service';
import { TipoRespuesta } from '../misavisos/tiporespuesta';
import {LoadingService} from '../service/loading.service ';
import { ObjetoGrupo } from '../cargar-objetos/objetoGrupo';
const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  productoURL = environment.urlEsmioApi; 

  constructor(private httpClient: HttpClient,private token:TokenService,public loading: LoadingService) { }

  public misavisos(): Observable<Mensaje[]> {
    return this.httpClient.get<Mensaje[]>(this.productoURL + '/api/notificacion_mensaje?login='+this.token.getUserName(), cabecera);
  }
  

  public misavisos_tipoRespuesta(): Observable<TipoRespuesta[]> {
    return this.httpClient.get<TipoRespuesta[]>(this.productoURL + '/api/mensaje_tiporespuesta', cabecera);
  }

  public log(tipo:string,pantalla:string,descripcion:string) {
   /* this.loading.present();   
    var parametros = {
      tipo: tipo,
      Login: this.token.getUserName(),
      pantalla: pantalla,
      descripcion: descripcion
  };

   this.httpClient.post<any>(this.productoURL + '/api/logs', parametros, cabecera)
    .subscribe(data => {
      this.loading.dismiss();
    },
      (err: any) => {
        this.loading.dismiss();
          console.log("Error:");
      }
    );*/
  }
  public crearObjeto(objeto: Objeto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + '/api/objeto', objeto, cabecera);
  }
  public obtenerObjetos(grupo): Observable<Objeto[]> {
    return this.httpClient.get<Objeto[]>(this.productoURL + '/api/objeto?login='+this.token.getUserName()+"&grupo="+grupo, cabecera);
  }
  public borrarObjeto(id: number): Observable<any> {
    console.log("borrar id"+id);    
    return this.httpClient.get<any>(this.productoURL + '/api/objeto/borrar?id='+id, cabecera);    
  }
  public obtenerObjetoByCodigo(codigo:string): Observable<Objeto> {
    return this.httpClient.get<Objeto>(this.productoURL + '/api/objeto/byCodigo?codigo='+codigo, cabecera);
  }
  public obtenerUsuario(login:string): Observable<Usuario> {

    return this.httpClient.get<Usuario>(this.productoURL + '/api/usuario?login='+login, cabecera);
  }
  public EnviarPush(login:string,nombre:string): Observable<any> {
    var parametros = {   
      emisor:'encontreCell',
      receptor: login,
      topic:'login',
      nombre:"Encontraron tu " + nombre,
      descripcion:"encontraron tu " + nombre  
  };
    return this.httpClient.post<any>(this.productoURL + '/api/notificacion_mensaje', parametros, cabecera);
  }



  public GuardarToken(usuario: any): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + '/api/notificacion_token', usuario, cabecera);
  }
  public GuardarRespuestaMisAvisos(id:number,respuesta:number): Observable<any> {
    var parametros = {
      id: id,
      respuesta:respuesta
  };
    //return this.httpClient.put<Mensaje>(this.productoURL + '/api/notificacion_token', parametros, cabecera);
    return this.httpClient.get<any>(this.productoURL + '/api/notificacion_mensaje/respuesta?id='+id+"&respuesta="+respuesta, cabecera);
  }

  public crearUsuario(usuario: Usuario): Observable<any> {
    this.token.setAgregarBeader("true");
    return this.httpClient.post<any>(this.productoURL + '/api/usuario', usuario, cabecera);
  }

  // public editar(producto: Producto, id: number): Observable<any> {
  //   return this.httpClient.put<any>(this.productoURL + `actualizar/${id}`, producto, cabecera);
  // }

  // public borrar(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(this.productoURL + `borrar/${id}`, cabecera);
  // }
  public obtenerGruposCombo(): Observable<ObjetoGrupo[]> {
    
    return this.httpClient.get<ObjetoGrupo[]>(this.productoURL + '/api/objetoGrupo/combo?login='+this.token.getUserName(), cabecera);
  }
  public obtenerGrupos(): Observable<ObjetoGrupo[]> {
    
    return this.httpClient.get<ObjetoGrupo[]>(this.productoURL + '/api/objetoGrupo?login='+this.token.getUserName(), cabecera);
  }

  public crearGrupo( grupo): Observable<any> {
    
    return this.httpClient.post<any>(this.productoURL + '/api/objetoGrupoadd', grupo, cabecera);
  }
}