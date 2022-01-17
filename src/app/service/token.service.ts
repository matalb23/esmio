import { Injectable } from '@angular/core';
import { Storage } from  '@ionic/storage';
//import { Observable } from 'rxjs';
const TOKEN_KEY = 'ACCESS_TOKEN';
const TOKEN_FCM = 'TOKEN_FCM';
const USERNAME_KEY = 'USER_NAME';
const NOMBREUSUARIO_KEY = 'NOMBREUSUARIO_KEY';
const USERPASS_KEY = 'USER_PASS';
const AUTHORITIES_KEY = 'AutAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = [];
  agregarbeader:boolean=false;
  constructor(private  storage:  Storage) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
  public setTokenFCM(token: string): void {
    window.sessionStorage.removeItem(TOKEN_FCM);
    window.sessionStorage.setItem(TOKEN_FCM, token);
  }

  public getTokenFCM(): string {
    return sessionStorage.getItem(TOKEN_FCM);
  }


  public setUserName(userName: string): void {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, userName);    
  }

  public getUserName(): string {
     return localStorage.getItem(USERNAME_KEY);
  }
  
  public setNombreUsuario(Name: string): void {
    window.localStorage.removeItem(NOMBREUSUARIO_KEY);
    window.localStorage.setItem(NOMBREUSUARIO_KEY, Name);    
  }
  public getNombreUsuario(): string {
     return localStorage.getItem(NOMBREUSUARIO_KEY);
     //return localStorage.getItem(USERNAME_KEY);
  }


  
  public setUserPass(pass: string): void {
    window.localStorage.removeItem(USERPASS_KEY);
    window.localStorage.setItem(USERPASS_KEY, pass);
  }

  public getUserPass(): string {
    return localStorage.getItem(USERPASS_KEY);
  }


  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void {
    //window.sessionStorage.clear();
  }

//agregarbeader:boolean=false;
public setAgregarBeader(userName: string): void {
  window.localStorage.removeItem("AgregarBeader");
  window.localStorage.setItem("AgregarBeader", userName);
}

public getAgregarBeader(): string {
  return localStorage.getItem("AgregarBeader");
}


public setPaginaInicio(PaginaInicio: string): void {
  
  window.sessionStorage.removeItem("PaginaInicio");
  window.sessionStorage.setItem("PaginaInicio", PaginaInicio);;
}

public getPaginaInicio(): string {
  return sessionStorage.getItem("PaginaInicio");
}

}
