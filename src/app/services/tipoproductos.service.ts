import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient } from '@angular/common/http';
import { Tipoproducto } from '../entity/Tipoproducto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoproductosService {
  URL: string = Constantes.URL_API()+'/tipoproducto';

  constructor(private http: HttpClient) { }

  getAll(dataTablesParameters:string): Observable<Tipoproducto[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Tipoproducto[]>(`${this.URL}/${serviceName}`);
  }

  save(tipoproducto: Tipoproducto): Observable<Tipoproducto>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.post<Tipoproducto>(`${this.URL}/${serviceName}`, tipoproducto);
  }
}
