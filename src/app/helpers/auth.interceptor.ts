import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh:boolean=false;

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.loginService.getToken();

    if(token!=null && token!="" && token!="null"){
      if((request.body instanceof FormData)){
        console.log("Se envian archivos el request");
        request = request.clone(
          {
            headers: request.headers.append('Authorization', `Bearer ${token}`)
          }
        );
      } else{
        console.log("NO se envian archivos");
        if(request.url.indexOf("refresh")>=0){
          request = request.clone(
            {
              setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin' : "*",
                'Authorization': `Bearer ${this.loginService.getRefreshToken()}`,
              },
            }
          );
        } else{
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
        }
      }
      console.log(`Request headers: ${JSON.stringify(request.headers)}`);
      console.log("headers Content-Type :: "+request.headers.get("Content-Type"));
    }
    console.log(`Request >> ${JSON.stringify(request)}`);
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status==401){
          return this.loginService.refresh().pipe(
            switchMap((res)=>{
              const newReq = request.clone({
                setHeaders: {
                  'Authorization': `Bearer ${this.loginService.getRefreshToken}`
                }
              });

              return next.handle(newReq);
            }),
            catchError((errRefresh:HttpErrorResponse)=>{
              return throwError(()=>errRefresh);
            })
          )
        }else{
          return throwError(()=>error);
        }
      })
    );
  }
}
