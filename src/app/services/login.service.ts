import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Credentials } from '../entity/Credentials';
import { Constantes } from '../utils/Constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL: string = Constantes.URL_JWT_API();

  constructor(private http:HttpClient) { }

  login(creds: Credentials){
    let serviceName='login';
    console.log("Request login "+this.URL+"/"+serviceName);
    
    return this.http.post(`${this.URL}/${serviceName}`, creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;

        const bearerToken = headers.get('Automatizacion')!;
        const token = bearerToken;// bearerToken.replace('Bearer', '');

        localStorage.setItem('token', token);

        return body;
      }))
  }

  getToken(){
    return localStorage.getItem('token');
  }
}