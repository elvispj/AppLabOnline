import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../entity/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  URL: string = Constantes.URL_API()+'/clientes';
  private httpheaders = new HttpHeaders();

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Clientes[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Clientes[]>(`${this.URL}/${serviceName}/`);
  }

  getCliente(id:number): Observable<Clientes>{
    let serviceName='search';
    console.log("Request search "+this.URL+"/"+serviceName+"/"+id);
    return this.http.get<Clientes>(`${this.URL}/${serviceName}/${id}`);
  }

  search(parametro:string): Observable<Clientes[]>{
    let serviceName='searchByLike';
    console.log("Request search "+this.URL+"/"+serviceName+"/"+parametro);
    return this.http.get<Clientes[]>(`${this.URL}/${serviceName}/${parametro}`);
  }

  save(cliente:Clientes) : Observable<Clientes>{
    let serviceName='save';
    console.log("Request save "+this.URL+"/"+serviceName);
    console.log(JSON.stringify(cliente));
    return this.http.post<Clientes>(`${this.URL}/${serviceName}`, cliente, {headers : this.httpheaders});
  }
}
