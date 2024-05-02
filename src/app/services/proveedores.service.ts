import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proveedores } from '../entity/Proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  URL: string = Constantes.URL_API()+'/proveedores';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Proveedores[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Proveedores[]>(`${this.URL}/${serviceName}`);
  }

  save(proveedor: Proveedores): Observable<Proveedores>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.post<Proveedores>(`${this.URL}/${serviceName}`, proveedor);
  }
}
