import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctores } from '../entity/Doctores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {

  URL: string = Constantes.URL_API()+'/doctores';
  private httpheaders = new HttpHeaders();

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Doctores[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Doctores[]>(`${this.URL}/${serviceName}/`);
  }

  getDoctor(id:number): Observable<Doctores>{
    let serviceName='search';
    console.log("Request search "+this.URL+"/"+serviceName+"/"+id);
    return this.http.get<Doctores>(`${this.URL}/${serviceName}/${id}`);
  }

  searchDoctor(parametro:string): Observable<Doctores[]>{
    let serviceName='searchByLike';
    console.log("Request search "+this.URL+"/"+serviceName+"/"+parametro);
    return this.http.get<Doctores[]>(`${this.URL}/${serviceName}/${parametro}`);
  }

  saveDoctor(doctor:Doctores) : Observable<Doctores>{
    let serviceName='save';
    console.log("Request save "+this.URL+"/"+serviceName);
    console.log(JSON.stringify(doctor));
    return this.http.post<Doctores>(`${this.URL}/${serviceName}`, doctor, {headers : this.httpheaders});
  }

  updateDoctor(doctor:Doctores) : Observable<Doctores>{
    let serviceName='update';
    console.log("request update "+this.URL+"/"+serviceName);
    console.log(JSON.stringify(doctor));
    return this.http.post<Doctores>(`${this.URL}/${serviceName}`, doctor, {headers : this.httpheaders});
  }
}
