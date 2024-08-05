import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctorcitas } from '../entity/Doctorcitas';

@Injectable({
  providedIn: 'root'
})
export class DoctorcitasService {

  URL: string = Constantes.URL_API()+'/citas';
  private httpheaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getCitasByDoctorid(id:number): Observable<Doctorcitas[]>{
    let serviceName='listByDoctorid';
    console.log("Request search "+this.URL+"/"+serviceName+"/"+id);
    return this.http.get<Doctorcitas[]>(`${this.URL}/${serviceName}/${id}`);
  }

  getCitaById(id:number): Observable<Doctorcitas>{
    let serviceName='search';
    console.log("Request search "+this.URL+"/"+serviceName+"/"+id);
    return this.http.get<Doctorcitas>(`${this.URL}/${serviceName}/${id}`);
  }

  saveCita(doctorcitas:Doctorcitas) : Observable<Doctorcitas>{
    let serviceName='save';
    console.log("Request save "+this.URL+"/"+serviceName);
    console.log(JSON.stringify(doctorcitas));
    return this.http.post<Doctorcitas>(`${this.URL}/${serviceName}`, doctorcitas, {headers : this.httpheaders});
  }
}
