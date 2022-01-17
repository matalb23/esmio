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

@Component({
  selector: 'app-cargar-objetos',
  templateUrl: './cargar-objetos.page.html',
  styleUrls: ['./cargar-objetos.page.scss'],
})
export class CargarObjetosPage implements OnInit {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  usuario=this.token.getUserName();

  //public grupos: Array<string>;
  grupos=[];
  public currentgrupo: number;
  error="";
  f_nombre="";
  f_descripcion="";

  constructor(private apiService:ApiService,private token:TokenService, private  router:  Router,private barcodeScanner: BarcodeScanner,public loading: LoadingService,public alert:AlertService,public alertController: AlertController) {
    this.encodeData = "";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true

    };
   }
  
  ngOnInit() {
    this.currentgrupo = 0;
  }

public guardar(obj:Objeto ): Observable<any>
  {
    this.apiService.log("200",'cargarobjeto','iniciando');
    this.loading.present();        
    this.apiService.crearObjeto(obj).subscribe(data => {
        console.log("Cargo Objeto" +  obj.nombre);
        this.loading.dismiss();
        
        var respuesta=JSON.parse(JSON.stringify(data));     
        if (respuesta.estado=="ok")
        {
        this.alert.presentAlert("Objeto agregado!","","Bien! Ya tenés tu " + obj.nombre + " identificado.");
       
        //this.router.navigateByUrl('home');
        }
        else
        { 
          if (respuesta.estado=="error")
            {
              switch(true) {
                case respuesta.estadoDescripcion.includes('UNIQUE KEY'):
                  this.alert.presentAlert("UPS!","", obj.codigo + " no está disponible.");
                   break;
                default:
                  this.alert.presentAlert("UPS!","","Consultá con tu administrador.");
              }
            }
        }

      },
        (err: any) => {
          
      alert(JSON.stringify(err));
          this.loading.dismiss();
            console.log("Error");
            
        }
      );
    this.apiService.log("200",'cargar el objeto: ' + obj.codigo,'iniciando');
     return null;
  }
   
  scanCode(form): Observable<any>{
    var parcodigo="";
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        parcodigo=this.getParameterByName("codigo", barcodeData.text);
        var parametros = {
          //codigo:barcodeData.text,
          codigo:parcodigo,
          descripcion: form.value.descripcion,
          login:this.token.getUserName(),
          nombre:form.value.nombre,
          grupo:form.value.Grupo
    
      };
        if(parcodigo!=null){
         this.guardar(parametros);
         this.f_nombre="";
         this.f_descripcion="";
        }
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

  selectChanged(selectedgrupo) {
    console.log("selectedgrupo:"+selectedgrupo);
    if (selectedgrupo === -1) //agregar grupo=-1
    {
      this.inputCustomgrupoValue()
    } else {
      this.currentgrupo = selectedgrupo;
    };
  };

  
  async inputCustomgrupoValue() {

    const inputAlert = await this.alertController.create({
      header: 'Ingresa el grupo:',
      inputs: [ { type: 'text', placeholder: 'Nombre' } ],
      buttons: [ { text: 'Cancelar' }, { text: 'Aceptar' } ]
    });

    
  inputAlert.onDidDismiss().then((data) => {
      let customgrupoName: string = data.data.values[0];
      ///console.log("data.data.values[0]"+data.data.values[0]);   
      //console.log("customgrupoName"+customgrupoName);   
      if (customgrupoName) {
        let indexFound = this.grupos.findIndex(grupo => grupo.descripcion === customgrupoName)
       // console.log("indexFound"+indexFound);   
        if (indexFound === -1) {
          ///this.grupos.push(customgrupoName);
          //this.currentgrupo = customgrupoName;//saber id
          var grupo = {
            descripcion:customgrupoName,
            login:this.token.getUserName()             
            };
        let gruponuevo; 
        gruponuevo=this.guardarGrupo(grupo);
        //this.grupos.push(gruponuevo);
        //this.grupos.push({id:gruponuevo.id,descripcion:gruponuevo.descripcion,login:gruponuevo.login});
        //this.grupos=this.grupos;
       
        //alert(gruponuevo.descripcion);
        //this.ionViewDidEnter();
        } else {
          this.currentgrupo = this.grupos[indexFound];
        };
      };      
    })
    await inputAlert.present();
      
  };

ionViewDidEnter(){    
    //this.ionViewDidEnter();
    this.loading.present();
    this.currentgrupo =0;//sin grupo
    this.getGrupos();
    this.loading.dismiss();
 }

  getGrupos(){
  
    this.apiService.obtenerGruposCombo().subscribe((data)=> {
          
           this.grupos=data;
           this.error="";   
           this.currentgrupo = 0;//selecciono el nombre del usuario por defecto

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
  
public guardarGrupo(grupo): Observable<any>
{
  this.apiService.log("200",'cargarGrupo','iniciando');
  this.loading.present();        
  this.apiService.crearGrupo(grupo).subscribe(data => {
      console.log("Cargo grupo" +  grupo.descripcion);
      this.loading.dismiss();
      this.currentgrupo=data.id;
      this.grupos.push(data);
     
      //var respuesta=JSON.parse(JSON.stringify(data));     
     // alert(JSON.stringify(data));
      return data;
      /*if (respuesta.estado=="ok")
      {
      this.alert.presentAlert("Objeto agregado!","","Bien! Ya tenés tu " + grupo.descripcion + " identificado.");
      
      this.router.navigateByUrl('home');
      }
      else
      { 
        if (respuesta.estado=="error")
          {
            switch(true) {
              case respuesta.estadoDescripcion.includes('UNIQUE KEY'):
                this.alert.presentAlert("UPS!","", obj.codigo + " no está disponible.");
                 break;
              default:
                this.alert.presentAlert("UPS!","","Consultá con tu administrador.");
            }
          }
      }*/

    },
      (err: any) => {
        
    alert(JSON.stringify(err));
        this.loading.dismiss();
          console.log("Error");
          
      }
    );
  //this.apiService.log("200",'cargar el objeto: ' + obj.codigo,'iniciando');
   return null;
}
  
}
