export class Tipoestudios
{
	public tipoestudioid: number;
	public tipoestudioactivo: boolean;
	public tipoestudionombre: string;
	public tipoestudiodescripcion: string;
	public tipoestudiofechacreacion: Date;
	public tipoestudiofechamodificacion: Date;
	public bitacoraid: number;

	constructor (tipoestudioid_: number,tipoestudioactivo_: boolean,tipoestudionombre_: string,tipoestudiodescripcion_: string,tipoestudiofechacreacion_: Date,tipoestudiofechamodificacion_: Date,bitacoraid_: number)
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