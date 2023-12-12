export class Especialidaddoctor
{
	public especialidaddoctorid: number;
	public especialidaddoctoractivo: boolean;
	public doctorid: number;
	public especialidadid: number;
	public especialidaddoctorfechacreacion: Date;
	public especialidaddoctorfechamodificacion: Date;
	public bitacoraid: number;

	constructor (especialidaddoctorid_: number,especialidaddoctoractivo_: boolean,doctorid_: number,especialidadid_: number,especialidaddoctorfechacreacion_: Date,especialidaddoctorfechamodificacion_: Date,bitacoraid_: number)
	{
		this.especialidaddoctorid = especialidaddoctorid_;
		this.especialidaddoctoractivo = especialidaddoctoractivo_;
		this.doctorid = doctorid_;
		this.especialidadid = especialidadid_;
		this.especialidaddoctorfechacreacion = especialidaddoctorfechacreacion_;
		this.especialidaddoctorfechamodificacion = especialidaddoctorfechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}