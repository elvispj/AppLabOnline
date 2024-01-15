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
}