import { Estudios } from "./Estudios";

export class Ordendetalle
{
	public ordendetalleid: number=-1;
	public ordenid: number=-1;
	public estudioid: number=-1;
	public ordendetalleactivo: boolean=true;
	public ordendetallecosto: number=0;
	public ordendetalledescuento: number=0;
	public ordendetalleimportedescuento: number=0;
	public ordendetallecostofinal: number=0;
	public ordendetallefechacreacion: Date=new Date();
	public ordendetallefechamodificacion: Date=new Date();
	public bitacoraid: number=-1;
	public estudionombre: string='';
	public estudio: Estudios = new Estudios();
}