import { Estudios } from "./Estudios";

export class Ordenes
{
	public ordenid: number=-1;
	public ordenactiva: boolean=true;
	public colaboradorid: number=-1;
	public clienteid: number=-1;
	public ordennombre: string='';
	public ordenedad: number=-1;
	public ordentelefono: string='';
	public ordendireccion: string='';
	public ordenformaentrega: string='';
	public ordenfechacreacion: Date | undefined;
	public ordenfechamodificacion: Date | undefined;
	public doctorid: number=-1;
	public bitacoraid: number=-1;
	public ordenorigen: string='';
	public ordencomentarios: string='';
	public ordenimporte: number=-1;
	public ordenimporteiva: number=-1;
	public ordendescuento: number=-1;
	public ordenimportedescuento: number=-1;
	public ordenimportetotal: number=-1;
	public ordencomoubico: string='';
	public ordendatosclinicos: string='';
	public ordenformapago:string='';
	public estudios?: Estudios[];
}