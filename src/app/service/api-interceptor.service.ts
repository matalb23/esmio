

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../service/token.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Usuario } from  '../auth/usuario';
import { Router } from  "@angular/router";
import { map, tap } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
  console.log("url:"+req.url+" token:"+token);
     //if (this.tokenService.getAgregarBeader()=="true")
     if(!req.url.includes("/token"))
     {
      if (token==null || token=="null"  ) 
      {
       
        
        var user={} as Usuario;
        user.login=this.tokenService.getUserName();
        user.pswd=this.tokenService.getUserPass();
        console.log("entro a relogin por token u:"+user.login+" p:"+user.pswd);
        //this.tokenService.setAgregarBeader("false");
        this.authService.login(user).subscribe(async(res)=>{          
          console.log("Agrego el bearer by login:"+this.tokenService.getToken());
          authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken()) });
          //this.tokenService.setAgregarBeader("true");
         return next.handle(authReq);
       
         
        });
      }

      else
      {
        console.log("aAgrego el bearer:"+token);
        authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
      
     }
    
     
    return next.handle(authReq);
    
        // return next.handle(req).pipe(
        //     tap(event => {
        //       if (event instanceof HttpResponse) {
        //         let response = event.body;
        //         if(response.Error){
        //             alert('error'+ 'Error '+response.Code+ response.Message);
        //         }
        //     }
        //     })
        //   );

  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log("handleAuthError");
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      console.log("401");
        //navigate /delete cookies or whatever
        this.router.navigateByUrl('/login');
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return Observable.throw(err.message);
    }
    return Observable.throw(err);
}

  constructor(private tokenService: TokenService,private  authService:  AuthService, private  router:  Router) { }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true}];