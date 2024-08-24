import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensajes } from '../entity/Mensajes';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  URL: string = Constantes.URL_API()+'/mensajes';

  private httpheaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getMensajes(id:number): Observable<Mensajes>{
    let serviceName='search';
    console.log("Request  "+this.URL+"/"+serviceName);
    return this.http.get<Mensajes>(`${this.URL}/${serviceName}/${id}`);
  }

  listByClienteid(clienteid:number): Observable<Mensajes[]>{
    let serviceName='listByClienteid';

    return this.http.get<Mensajes[]>(`${this.URL}/${serviceName}/${clienteid}`);
  }

  listByDoctorid(doctorid:number): Observable<Mensajes[]>{
    let serviceName='listByDoctorid';

    return this.http.get<Mensajes[]>(`${this.URL}/${serviceName}/${doctorid}`);
  }

  save(estudio: Mensajes): Observable<Mensajes>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);

    return this.http.post<Mensajes>(`${this.URL}/${serviceName}`, estudio);
  }
}
