import { Injectable } from '@angular/core';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  esEmailValido(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
  CelularValidarFormatear(usuario)   
  {
    
    let celu=usuario.phone_cell;
    let pais=usuario.pais_codigo;
    let resultado="";
    const phoneNumber = parsePhoneNumberFromString(celu,pais);
  
    if (phoneNumber) {
  
      if  (phoneNumber.isValid() == true)
      {
        resultado=phoneNumber.format("INTERNATIONAL");        
        resultado=(resultado + " ").split(' ').join('');        
      }
      else
      {
       
        
        

      }
    }  
    return resultado;
  }

}
