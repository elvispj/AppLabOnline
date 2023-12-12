export class Doctores
{
	public doctorid: number;
	public doctoractivo: boolean;
	public doctornombre: string;
	public doctorapellidopaterno: string;
	public doctorapellidomaterno: string;
	public doctorcedula: string;
	public doctortitulo: string;
	public doctorfechacreacion: Date;
	public doctorfechamodificacion: Date;
	public bitacoraid: number;

	constructor (doctorid_: number,doctoractivo_: boolean,doctornombre_: string,doctorapellidopaterno_: string,doctorapellidomaterno_: string,doctorcedula_: string,doctortitulo_: string,doctorfechacreacion_: Date,doctorfechamodificacion_: Date,bitacoraid_: number)
	{
		this.doctorid = doctorid_;
		this.doctoractivo = doctoractivo_;
		this.doctornombre = doctornombre_;
		this.doctorapellidopaterno = doctorapellidopaterno_;
		this.doctorapellidomaterno = doctorapellidomaterno_;
		this.doctorcedula = doctorcedula_;
		this.doctortitulo = doctortitulo_;
		this.doctorfechacreacion = doctorfechacreacion_;
		this.doctorfechamodificacion = doctorfechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}