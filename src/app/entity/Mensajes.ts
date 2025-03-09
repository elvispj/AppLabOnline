import { Mensajetipos } from "./Mensajetipos";

export class Mensajes
{
	public mensajeid: number=0;
	public mensajetipoid!: string;
	public mensajeestatusid!: string;
	public doctorid!: number;
	public clienteid!: number;
	public mensajetitulo!: string;
	public mensajecuerpo!: string;
	public mensajerespuesta!: string;
	public mensajefechacreacion!: Date;
	public mensajefechamodificacion!: Date;
	public mensajetipo!:Mensajetipos;
}