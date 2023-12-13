export class Tipoestudios
{
	public tipoestudioid: number;
	public tipoestudioactivo: boolean;
	public tipoestudionombre: string;
	public tipoestudiodescripcion: string;
	public tipoestudiofechacreacion: Date| null;
	public tipoestudiofechamodificacion: Date| null;
	public bitacoraid: number;

	constructor (tipoestudioid_: number,tipoestudioactivo_: boolean,tipoestudionombre_: string,tipoestudiodescripcion_: string,tipoestudiofechacreacion_: Date| null,tipoestudiofechamodificacion_: Date| null,bitacoraid_: number)
	{
		this.tipoestudioid = tipoestudioid_;
		this.tipoestudioactivo = tipoestudioactivo_;
		this.tipoestudionombre = tipoestudionombre_;
		this.tipoestudiodescripcion = tipoestudiodescripcion_;
		this.tipoestudiofechacreacion = tipoestudiofechacreacion_;
		this.tipoestudiofechamodificacion = tipoestudiofechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}