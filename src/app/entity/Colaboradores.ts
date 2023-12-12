export class Colaboradores
{
	public colaboradorid: number;
	public colaboradoractivo: boolean;
	public colaboradornombre: string;
	public colaboradorcedula: string;
	public colaboradorfechacreacion: Date;
	public colaboradorfechamodificacion: Date;
	public colaboradorimagen: number[];
	public bitacoraid: number;

	constructor (colaboradorid_: number,colaboradoractivo_: boolean,colaboradornombre_: string,colaboradorcedula_: string,colaboradorfechacreacion_: Date,colaboradorfechamodificacion_: Date,colaboradorimagen_: number[],bitacoraid_: number)
	{
		this.colaboradorid = colaboradorid_;
		this.colaboradoractivo = colaboradoractivo_;
		this.colaboradornombre = colaboradornombre_;
		this.colaboradorcedula = colaboradorcedula_;
		this.colaboradorfechacreacion = colaboradorfechacreacion_;
		this.colaboradorfechamodificacion = colaboradorfechamodificacion_;
		this.colaboradorimagen = colaboradorimagen_;
		this.bitacoraid = bitacoraid_;
	}
}