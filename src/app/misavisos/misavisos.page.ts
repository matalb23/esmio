import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service';
import {TokenService} from '../service/token.service';
import {LoadingService} from '../service/loading.service ';
import { Router } from  "@angular/router";


@Component({
  selector: 'app-misavisos',
  templateUrl: './misavisos.page.html',
  styleUrls: ['./misavisos.page.scss'],
})
export class MisavisosPage implements OnInit {
  postList=[];
  usuario=this.token.getUserName();
  respuestaList=[];
  error="";
  constructor(private api:ApiService,public token:TokenService,public loading: LoadingService, private  router:  Router  
    ) {
  
    
  }
  getMisAvisos(){

   // this.loading.present();   
    this.api.misavisos().subscribe((data)=> {
           // this.loading.dismiss();
            this.postList=data;
            this.error="";
            if (this.postList.length==0)
            this.error="No hay avisos para mostrar.";
            
          }
    ,
      (err: any) => {
        this.loading.dismiss();
        console.log(err);
       
        var respuesta=JSON.parse(JSON.stringify(err));   
        this.postList=null;
        switch(true) {
          case respuesta.message.includes('Http failure response'):
              this.error="Problemas de conexión :-(";
             break;
          default:
            alert(JSON.stringify(err));
            
        }
      }
    );
    
  }

  getMisAvisosTiposRespuestas(){
    this.loading.present();   
    this.api.misavisos_tipoRespuesta().subscribe((data)=> {
            this.loading.dismiss();
            this.respuestaList=data;
            
    }
    ,
      (err: any) => {
          this.loading.dismiss();
          console.log(err);
       
        var respuesta=JSON.parse(JSON.stringify(err));   
 
       
        switch(true) {
          case respuesta.message.includes('Http failure response'):
              this.error="Problemas de conexión :-(";
             break;
          default:
            alert(JSON.stringify(err));
            
        }
          
      }
    );
    
  }
  responder(id:number,respuesta: number){
    //this.loading.present();   
    this.api.GuardarRespuestaMisAvisos(id,respuesta).subscribe((data)=> {
      //this.loading.dismiss();
      location.reload();     
    }
,
(err: any) => {
    this.loading.dismiss();
    console.log("Error:");
    console.log(JSON.stringify(err));
}
);
 
    
  }

  ngOnInit() {
    // this.platform.ready().then(() => {
    //   this.getMisAvisos();
    //   this.getMisAvisosTiposRespuestas();
    // });
  }
  ngAfterViewInit () {
    
  }
  ionViewDidEnter(){
    this.loading.present();
    this.getMisAvisos();
    this.getMisAvisosTiposRespuestas();
    this.loading.dismiss();
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

}
