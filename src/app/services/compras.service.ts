import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compras } from '../entity/Compras';

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

  save(compras: Compras): Observable<Compras>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.post<Compras>(`${this.URL}/${serviceName}`, compras);
  }
}
