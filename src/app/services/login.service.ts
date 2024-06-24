import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Credentials } from '../entity/Credentials';
import { Constantes } from '../utils/Constantes';
import { Router } from '@angular/router';
import { Usuarios } from '../entity/Usuarios';

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
        console.log("Response>> "+JSON.stringify(response));
        let usuario:Usuarios={
          usuarioid: response.body.id,
          perfilid: 0,
          colaboradorid: 0,
          usuarioactivo: false,
          usuariocorreo: response.body.username,
          usuariopwd: '',
          usuarionombre: '',
          usuarioapellidopaterno: '',
          usuarioapellidomaterno: '',
          usuariofechacreacion: new Date(),
          usuariofechamodificacion: new Date(),
          usuarioultimoacceso: new Date(),
          usuariokey: '',
          usuarioimage: []
        };
        const body = response.body;
        const headers = response.headers;

        console.log("Respuesta headers >> "+JSON.stringify(headers));
        console.log("Respuesta body >> "+JSON.stringify(body));

        const bearerToken = body.token;
        if(bearerToken!=null){
          const token = bearerToken.replace('Bearer', '');

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("usuario", JSON.stringify(usuario));
        }
        return usuario;
      }))
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    this.router.navigate(['/login']);
  }

}