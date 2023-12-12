export class Estudios
{
	public estudioid: number;
	public tipoestudioid: number;
	public estudioactivo: boolean;
	public estudionombre: string;
	public estudiodescripcion: string;
	public estudiofechacreacion: Date;
	public estudiofechamodificacion: Date;
	public bitacoraid: number;
	public estudionombrecorto: string;
	public estudiocosto: number;

	constructor (estudioid_: number,tipoestudioid_: number,estudioactivo_: boolean,estudionombre_: string,estudiodescripcion_: string,estudiofechacreacion_: Date,estudiofechamodificacion_: Date,bitacoraid_: number,estudionombrecorto_: string,estudiocosto_: number)
	{
		this.estudioid = estudioid_;
		this.tipoestudioid = tipoestudioid_;
		this.estudioactivo = estudioactivo_;
		this.estudionombre = estudionombre_;
		this.estudiodescripcion = estudiodescripcion_;
		this.estudiofechacreacion = estudiofechacreacion_;
		this.estudiofechamodificacion = estudiofechamodificacion_;
		this.bitacoraid = bitacoraid_;
		this.estudionombrecorto = estudionombrecorto_;
		this.estudiocosto = estudiocosto_;
	}
}