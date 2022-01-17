import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import {ApiService} from '../service/api.service';
import { analyzeAndValidateNgModules, tokenName } from '@angular/compiler';
import { Alert } from 'selenium-webdriver';
import {TokenService} from '../service/token.service';
import { Router } from  "@angular/router";
import { BarcodeScannerOptions, BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Objeto} from '../cargar-objetos/objeto';
import {LoadingService} from '../service/loading.service ';
import {AlertService} from '../service/alertionic.service';



@Component({
  selector: 'app-devolver',
  templateUrl: './devolver.page.html',
  styleUrls: ['./devolver.page.scss'],
})
export class DevolverPage implements OnInit {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  usuario=this.token.getUserName();
   
  constructor(private apiService:ApiService,private token:TokenService, private  router:  Router,private barcodeScanner: BarcodeScanner,public loading: LoadingService,public alert:AlertService) {
    this.encodeData = "";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true

    };
   }
  
  ngOnInit() {
  }
  public avisar(codigo:string ): Observable<any>
  {
    this.apiService.log("200",'cargarobjeto','iniciando');
    this.loading.present();        
    this.apiService.obtenerObjetoByCodigo(codigo).subscribe(data => {

      
      this.apiService.EnviarPush(data.login,data.nombre).subscribe(data => {
       
          
        },
          (err: any) => {
              alert(JSON.stringify(err));
          }
        );


        console.log("ya se le informo al dueño sobre" +  data.nombre);
        this.loading.dismiss();
         this.alert.presentAlert("Gracias!","Ya se le informó al dueño","en breve te responderá el dueño sobre " + data.nombre + " encontrado.");
        
        this.router.navigateByUrl('home');
      },
        (err: any) => {
          this.loading.dismiss();
            console.log("Error");
            alert(JSON.stringify(err));
        }
      );
    //this.apiService.log("200",'cargar el objeto: ' + obj.codigo,'iniciando');
     return null;
  }
   
  scanCode(form): Observable<any>{
    var parcodigo="";
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        parcodigo=this.getParameterByName("codigo", barcodeData.text);
 
        if(parcodigo!=null)
         this.avisar(parcodigo);
         else
         this.alert.presentAlert("Error en URL","","la url del QR no presenta el código del objeto.");
         
        
      
      })
      .catch(err => {
        console.log("Error", err);
      });
      return null;
  }
 
  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  

}
