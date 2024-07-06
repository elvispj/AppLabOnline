import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { Observable } from 'rxjs';
import { Pagos } from '../entity/Pagos';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  URL: string = Constantes.URL_API()+'/pagos';

  constructor(private http: HttpClient) { }

  getAll(dataTablesParameters:string): Observable<Pagos[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Pagos[]>(`${this.URL}/${serviceName}`);
  }

  getPagoByOrdenId(ordenid:number): Observable<Pagos>{
    let serviceName='search/orden';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Pagos>(`${this.URL}/${serviceName}/${ordenid}`);
  }

  save(pagos: Pagos): Observable<Pagos>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.post<Pagos>(`${this.URL}/${serviceName}`, pagos);
  }
}
