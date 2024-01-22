import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.loginService.getToken();

    if(token!=null && token!="" && token!="null"){
      console.log("Intercepta con token "+token);
     /* const cloned = request.clone({
        headers : request.headers.set('Authorization', `Bearer ${token}`)
      });*/
      request = request.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin' : "*",
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      //return next.handle(cloned);
    }
    //console.log(">> "+JSON.stringify(request));
    return next.handle(request);
  }
}
