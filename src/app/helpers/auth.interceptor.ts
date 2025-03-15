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
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh:boolean=false;

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.loginService.getToken();

    if(token!=null && token!="" && token!="null"){
      let new_Request:any;
      if((request.body instanceof FormData)){
        console.log("Se envian archivos el request");
        new_Request = request.clone(
          {
            headers: request.headers.append('Authorization', `Bearer ${token}`)
          }
        );
      } else{
        if(request.url.indexOf("/refresh")>=0){
          console.log("\n\t\t ********** REFRESH TOKEN **********");
          new_Request = request.clone(
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
          new_Request = request.clone(
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
      console.log(`Request >> ${JSON.stringify(new_Request)}`);
      return next.handle(new_Request).pipe(
        catchError((error:HttpErrorResponse)=>{
          if(error.status==401 && !this.refresh){
            this.refresh=true;
            return this.loginService.refresh().pipe(
              switchMap((res:any)=>{
                const newReq = request.clone({
                  setHeaders: {
                    Authorization: 'Bearer '+sessionStorage.getItem('token')
                  }
                });
                this.refresh=false;
                console.log("\t*********Manda url original");
                return next.handle(newReq);
              }),
              catchError((errRefresh:HttpErrorResponse)=>{
                console.log("FALLO EL REFRESH "+JSON.stringify(errRefresh));
                this.loginService.logout();
                Swal.fire('Logout','Es necesario que inicies sesion nuevamente.', 'error');
                return throwError(()=>errRefresh);
              })
            )
          }else{
            console.log("FALLO EL REQUEST ORIGINAL URL="+new_Request.url);
            return throwError(()=>error);
          }
        })
      );
    }else{
      return next.handle(request);
    }
  }
}
