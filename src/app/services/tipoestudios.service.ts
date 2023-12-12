import { Injectable } from '@angular/core';
import { Constantes } from '../entity/Constantes';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Tipoestudios } from '../entity/Tipoestudios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoestudiosService {
  URL: string = Constantes.URL_API()+'/tipoestudios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tipoestudios[]>{
    return this.http.get<Tipoestudios[]>(`${this.URL}/all/`);
  }

  getList(): Observable<Tipoestudios[]>{
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('limit', 20);
    params = params.append('offset', 0);
    console.log("Ya vino por la info");

    return this.http.get<Tipoestudios[]>(`${this.URL}/list`, { params: params });
  }
}
