import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Credentials } from '../entity/Credentials';
import { Constantes } from '../utils/Constantes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL: string = Constantes.URL_JWT_API();

  constructor(private http:HttpClient, private router:Router) { }

  login(creds: Credentials){
    console.log(">> "+JSON.stringify(creds));
    let serviceName='login';
    console.log("Request login "+this.URL+"/"+serviceName);
    
    return this.http.post<any>(`${this.URL}/${serviceName}`, creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;

        console.log("Respuesta headers >> "+JSON.stringify(headers));
        console.log("Respuesta body >> "+JSON.stringify(body));

        const bearerToken = body.token;
        if(bearerToken!=null){
          const token = bearerToken.replace('Bearer', '');

          sessionStorage.setItem("token", token);
        }
        return body;
      }))
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}