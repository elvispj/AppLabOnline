import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Estudios } from '../entity/Estudios';
import { Constantes } from '../utils/Constantes';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  //URL:string='http://127.0.0.1:8080/api/v1/estudios';
  URL: string = Constantes.URL_API()+'/estudios';

//  const options = { params: new HttpParams().set('limit', 10)};

  private httpheaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getAll(dataTablesParameters:any): Observable<any[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.post<any[]>(`${this.URL}/${serviceName}/`, dataTablesParameters);
  }

  getEstudios(limit:number, offset:number): Observable<Estudios[]>{
    let serviceName='list';
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('limit', limit);
    params = params.append('offset', offset);

    return this.http.get<Estudios[]>(`${this.URL}/${serviceName}`, { params: params });
  }

  save(estudio: Estudios): Observable<Estudios>{
    let serviceName='save';
    console.log("Request list "+this.URL+"/"+serviceName);

    return this.http.post<Estudios>(`${this.URL}/${serviceName}`, estudio);
  }
}
