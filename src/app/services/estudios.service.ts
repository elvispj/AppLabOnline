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

  getAll(): Observable<Estudios[]>{
    let serviceName='all';
    console.log("Request list "+this.URL+"/"+serviceName);
    return this.http.get<Estudios[]>(`${this.URL}/${serviceName}/`);
  }

  getEstudios(): Observable<Estudios[]>{
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('limit', 20);
    params = params.append('offset', 0);
    console.log("Ya vino por la info");

    return this.http.get<Estudios[]>(`${this.URL}/list`, { params: params });
  }
}
