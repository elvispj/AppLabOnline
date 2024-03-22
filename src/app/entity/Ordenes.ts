import { Clientes } from "./Clientes";
import { Estudios } from "./Estudios";
import { Ordendetalle } from "./Ordendetalle";

export class Ordenes
{
	public ordenid: number=-1;
	public ordenactiva: boolean=true;
	public colaboradorid: number=-1;
	public clienteid: number=-1;
	public ordennombre: string='';
	public ordenedad: number=-1;
	public ordensexo: string='';
	public ordentelefono: string='';
	public ordendireccion: string='';
	public ordenformaentrega: string='';
	public ordenfechacreacion: Date | undefined;
	public ordenfechamodificacion: Date | undefined;
	public doctorid: number=-1;
	public bitacoraid: number=-1;
	public ordenorigen: string='';
	public ordencomentarios: string='';
	public ordenimporte: number=0;
	public ordenimporteiva: number=0;
	public ordendescuento: number=0;
	public ordenimportedescuento: number=0;
	public ordenimporteotrocobro: number=0;
	public ordenimportetotal: number=0;
	public ordencomoubico: string='';
	public ordendatosclinicos: string='';
	public formapagoid:string='';
	public ordenimportemaquila:number=0;
	public ordenesdetalle: Ordendetalle[]=[];
	public cliente: Clientes=new Clientes();
}