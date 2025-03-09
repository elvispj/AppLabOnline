import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ChangePass, Credentials } from '../entity/Credentials';
import { Constantes } from '../utils/Constantes';
import { Router } from '@angular/router';
import { Usuarios } from '../entity/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL: string = Constantes.URL_JWT_API();

  constructor(private http:HttpClient, private router:Router) { }

  changePass(changePass:ChangePass){
    let serviceName='update';
    console.log("Change Pass "+this.URL+"/"+serviceName);
    
    return this.http.post<any>(`${this.URL}/${serviceName}`, changePass, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      return this.doResponse(response);
    }));
  }

  login(creds: Credentials){
    console.log(">> "+JSON.stringify(creds));
    let serviceName='login';
    console.log("Request login "+this.URL+"/"+serviceName);
    
    return this.http.post<any>(`${this.URL}/${serviceName}`, creds, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        console.log("Response>> "+JSON.stringify(response));
        return this.doResponse(response);
      })
    )
  }

  refresh(){
    let serviceName='refresh';

    return this.http.post<any>(`${this.URL}/${serviceName}`, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        console.log("Response>> "+JSON.stringify(response));
        sessionStorage.setItem("token", response.body.token);
        sessionStorage.setItem("refreshtoken", response.body.refreshtoken);
      }),
      catchError((error:HttpErrorResponse)=>{
        return throwError(()=>error);
      })
    )
  }

  doResponse(response:any){
    const body = response.body;
    const headers = response.headers;
    let usuario = body.usuario;

    console.log("Respuesta headers >> "+JSON.stringify(headers));
    console.log("Respuesta body >> "+JSON.stringify(body));

    const bearerToken = body.token;
    if(bearerToken!=null){
      const token = bearerToken.replace('Bearer', '');

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshtoken", body.refreshtoken);
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
    }
    return usuario;
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  getRefreshToken(){
    return sessionStorage.getItem('refreshtoken');
  }

  logout():void{
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}