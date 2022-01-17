import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api.service';
import {TokenService} from '../service/token.service';
import {LoadingService} from '../service/loading.service ';
import { Router,ActivatedRoute } from  "@angular/router";
import {AlertService} from '../service/alertionic.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-misobjetos',
  templateUrl: './misobjetos.page.html',
  styleUrls: ['./misobjetos.page.scss'],
})
export class MisobjetosPage implements OnInit {
  misobjetos=[];
  usuario=this.token.getUserName();
  error="";
  grupo:any;
  constructor(private api:ApiService,public token:TokenService,public loading: LoadingService, private  router: Router,private route: ActivatedRoute,public alert:AlertService,public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      if (params && params.grupo) {
        this.grupo = JSON.parse(params.grupo);
      }
    });
   }

  
  irLogout(){
    this.token.setUserName(null);
    this.token.setUserPass(null);
    this.router.navigateByUrl('login');  
  }
  getMisObjetos(){
  
    this.api.obtenerObjetos(this.grupo).subscribe((data)=> {
         // alert(JSON.stringify(data));
           this.misobjetos=data;
           this.error="";           
           //alert(JSON.stringify(data[0]));
            if (this.misobjetos.length==0)
            {
              this.error="No hay objetos para mostrar.";
            }
          }
    ,
      (err: any) => {
          //alert(JSON.stringify(err));
           
          this.loading.dismiss();
          console.log("Error:");
          console.log(err);
       
          var respuesta=JSON.parse(JSON.stringify(err));   
          this.misobjetos=null;
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
  async borrar(id:number, nombre:string)  {


    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: "¿Esta seguro de eliminar " + nombre + "?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //return false;
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            
      this.api.borrarObjeto(id).subscribe((data)=> {
        this.alert.presentAlert("Objeto " + nombre + " Eliminado!","","");
        location.reload();     
      }
      ,
  (err: any) => {
      console.log("Error:");
    
  } );

    
          }
        }
      ]
    });

    await alert.present();

//     this.alert.presentAlertConfirm("¿Esta seguro de eliminar " + nombre + "?").then((respuesta)=>{
// if (respuesta) {
//       this.api.borrarObjeto(id).subscribe((data)=> {
//         this.alert.presentAlert("Objeto " + nombre + " Eliminado!","","");
//         location.reload();     
//       }
//       ,
//   (err: any) => {
//       console.log("Error:");
//     // alert(JSON.stringify(err));
//   } );
// }
//     }



//     );
    
        
  


}
ngOnInit() {
}
ngAfterViewInit () {

}
ionViewDidEnter(){
    // Put here the code you want to execute
  this.loading.present();
  this.getMisObjetos();
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
  this.router.navigate(['/grupo']);//  this.router.navigateByUrl('misobjetos');  
}

irPerfil(){ 
  //this.router.navigateByUrl('perfil');  
  this.router.navigate(['/perfil']);
}

}