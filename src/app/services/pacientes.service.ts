import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from '../utils/Constantes';
import { Pacientes } from '../entity/Pacientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  URL: string = Constantes.URL_API()+'/pacientes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pacientes[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Pacientes[]>(`${this.URL}/${serviceName}/`);
  }

  getListByDoctorid(doctorid:number): Observable<Pacientes[]>{
    let serviceName='listByDoctorid';
    console.log("Request list ByDoctorid "+this.URL+"/"+serviceName);
    return this.http.get<Pacientes[]>(`${this.URL}/${serviceName}/${doctorid}`);
  }

  getPaciente(id:number): Observable<Pacientes>{
    let serviceName='search';
    console.log("Request  "+this.URL+"/"+serviceName);
    return this.http.get<Pacientes>(`${this.URL}/${serviceName}/${id}`);
  }

  savePaciente(paciente:Pacientes) : Observable<Pacientes>{
    let serviceName='save';
    console.log("Request  "+this.URL+"/"+serviceName);
    return this.http.post<Pacientes>(`${this.URL}/${serviceName}`, paciente);
  }
}
