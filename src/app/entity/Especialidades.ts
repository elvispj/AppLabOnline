export class Especialidades
{
	public especialidadid: number;
	public especialidadactivo: boolean;
	public especialidadnombre: string;
	public especialidaddescripcion: string;
	public especialidadfechacreacion: Date;
	public especialidadfechamodificacion: Date;
	public bitacoraid: number;

	constructor (especialidadid_: number,especialidadactivo_: boolean,especialidadnombre_: string,especialidaddescripcion_: string,especialidadfechacreacion_: Date,especialidadfechamodificacion_: Date,bitacoraid_: number)
	{
		this.especialidadid = especialidadid_;
		this.especialidadactivo = especialidadactivo_;
		this.especialidadnombre = especialidadnombre_;
		this.especialidaddescripcion = especialidaddescripcion_;
		this.especialidadfechacreacion = especialidadfechacreacion_;
		this.especialidadfechamodificacion = especialidadfechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}