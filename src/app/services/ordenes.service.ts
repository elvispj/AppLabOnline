import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Ordenes } from '../entity/Ordenes';
import { Constantes } from '../utils/Constantes';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  URL: string = Constantes.URL_API()+'/ordenes';
  private httpheaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getOrdenes(): Observable<Ordenes[]>{
    let serviceName='list';
    console.log("Request  "+this.URL+"/"+serviceName);
    return this.http.get<Ordenes[]>(`${this.URL}/${serviceName}/`);
  }

  getOrden(id:number): Observable<Ordenes>{
    let serviceName='search';
    console.log("Request  "+this.URL+"/"+serviceName);
    return this.http.get<Ordenes>(`${this.URL}/${serviceName}/${id}`);
  }

  saveOrden(ordenes:Ordenes) : Observable<Ordenes>{
    let serviceName='save';
    console.log("Request  "+this.URL+"/"+serviceName);
    return this.http.post<Ordenes>(`${this.URL}/${serviceName}`, ordenes, {headers : this.httpheaders});
  }

  getURLOrdenes():string{
    return this.URL+"/list";
  }

}
