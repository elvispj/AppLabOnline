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

  getAlumnos(): Observable<Ordenes[]>{
    return this.http.get<Ordenes[]>(`${this.URL}/list`);
  }

  getAlumno(id:number): Observable<Ordenes>{
    return this.http.get<Ordenes>(`${this.URL}/search/${id}`);
  }

  saveAlumno(ordenes:Ordenes) : Observable<Ordenes>{
    return this.http.post<Ordenes>(`${this.URL}/save`, ordenes, {headers : this.httpheaders});
  }

}
