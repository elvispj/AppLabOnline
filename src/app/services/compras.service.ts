import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompraProveedor, Compras } from '../entity/Compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  URL: string = Constantes.URL_API()+'/compras';

  constructor(private http: HttpClient) { }

  getAll(dataTablesParameters:string): Observable<Compras[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Compras[]>(`${this.URL}/${serviceName}`);
  }

  allCompras(dataTablesParameters:string): Observable<CompraProveedor[]>{
    let serviceName='allCompras';
    console.log("Request allCompras "+this.URL+"/"+serviceName);
    return this.http.get<CompraProveedor[]>(`${this.URL}/${serviceName}`);
  }

  save(compras: Compras): Observable<Compras>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.post<Compras>(`${this.URL}/${serviceName}`, compras);
  }
}
