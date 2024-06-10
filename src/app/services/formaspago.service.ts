import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formaspago } from '../entity/formaspago';

@Injectable({
  providedIn: 'root'
})
export class FormaspagoService {
  URL: string = Constantes.URL_API()+'/formaspago';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Formaspago[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Formaspago[]>(`${this.URL}/${serviceName}/`);
  }
}
