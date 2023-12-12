export class Tipoproducto
{
	public tipoproductoid: number;
	public tipoproductoactivo: boolean;
	public tipoproductonombre: string;
	public tipoproductodescripcion: string;
	public tipoproductofechacreacion: Date;
	public tipoproductofechamodificacion: Date;
	public bitacoraid: number;

	constructor (tipoproductoid_: number,tipoproductoactivo_: boolean,tipoproductonombre_: string,tipoproductodescripcion_: string,tipoproductofechacreacion_: Date,tipoproductofechamodificacion_: Date,bitacoraid_: number)
	{
		this.tipoproductoid = tipoproductoid_;
		this.tipoproductoactivo = tipoproductoactivo_;
		this.tipoproductonombre = tipoproductonombre_;
		this.tipoproductodescripcion = tipoproductodescripcion_;
		this.tipoproductofechacreacion = tipoproductofechacreacion_;
		this.tipoproductofechamodificacion = tipoproductofechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}