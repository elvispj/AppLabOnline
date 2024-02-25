import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario, InventarioTipoProducto } from '../entity/Inventario';
import { Constantes } from '../utils/Constantes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  URL: string = Constantes.URL_API()+'/inventario';

  constructor(private http: HttpClient) { }

  getAll(dataTablesParameters:string): Observable<Inventario[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Inventario[]>(`${this.URL}/${serviceName}`);
  }

  getAllTipoProducto(dataTablesParameters:string): Observable<InventarioTipoProducto[]>{
    let serviceName='allTipoProducto';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<InventarioTipoProducto[]>(`${this.URL}/${serviceName}`);
  }

  save(inventario: Inventario): Observable<Inventario>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.post<Inventario>(`${this.URL}/${serviceName}`, Inventario);
  }
}
