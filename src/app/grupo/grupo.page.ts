import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import {ApiService} from '../service/api.service';
import {TokenService} from '../service/token.service';
import { Router } from  "@angular/router";
import { BarcodeScannerOptions, BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Objeto} from '../cargar-objetos/objeto';
import {LoadingService} from '../service/loading.service ';
import {AlertService} from '../service/alertionic.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.page.html',
  styleUrls: ['./grupo.page.scss'],
})
export class GrupoPage implements OnInit {
  grupos=[];
  
  error="";
  usuario=this.token.getUserName();
  constructor(private apiService:ApiService,private token:TokenService, private  router:  Router,private barcodeScanner: BarcodeScanner,public loading: LoadingService,public alert:AlertService,public alertController: AlertController
    ,public navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  
ionViewDidEnter(){     
  this.loading.present();  
  this.getGrupos();
  this.loading.dismiss();
}
  getGrupos(){
  
    this.apiService.obtenerGrupos().subscribe((data)=> {
          
           this.grupos=data;
           this.error="";   
           

            if (this.grupos.length==0)
            {
              this.error="No hay grupos para mostrar.";
            }
          }
    ,
      (err: any) => {
          this.loading.dismiss();
          console.log("Error:");
          console.log(err);
       
          var respuesta=JSON.parse(JSON.stringify(err));   
          this.grupos=null;
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
  seleccionar(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          grupo: JSON.stringify(id)          
      }
  };
  this.navCtrl.navigateForward(['misobjetos'], navigationExtras);

  }
}
