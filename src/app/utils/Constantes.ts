import { HttpHeaders } from "@angular/common/http";
import { Doctores } from "../entity/Doctores";

export class Constantes{
    public static HOST:string='http://127.0.0.1';
    public static PORT:string='8080';
    public static API:string='/api/v1';
    public static JWT: string='/auth';

    public static URL_API(){
        return Constantes.HOST+":"+Constantes.PORT+Constantes.API;
    }

    public static URL_JWT_API(){
        return Constantes.HOST+":"+Constantes.PORT+Constantes.JWT;
    }

    public static GetDoctorInfo():Doctores|undefined{
        if(sessionStorage.getItem("doctor_info")){
            return JSON.parse(sessionStorage.getItem("doctor_info")!);
        } else {
            console.log("No existe variable doctor_info");
            return undefined;
        }
    }

    public static getHeaders(): HttpHeaders {
        let httpheaders = new HttpHeaders();
        httpheaders.set('Content-Type', 'application/json; charset=utf-8');
        httpheaders.set('Accept', 'application/json');
        console.log("getHeaders >> "+httpheaders.getAll);
        return httpheaders;
    }

    public static getHeadersMultipart(): HttpHeaders {
        let httpheaders = new HttpHeaders();
        httpheaders.set('Accept', 'multipart/form-data');
        httpheaders.set('mimeType', 'multipart/form-data');
        httpheaders.set( 'Content-Type', 'multipart/form-data');
        console.log("getHeadersMultipart >> "+httpheaders.getAll);
        return httpheaders;
    }
}