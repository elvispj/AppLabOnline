export class Inventario
{
	public inventarioid: number;
	public compraid: number;
	public tipoproductoid: number;
	public inventarioactivo: boolean;
	public inventariocostoporunidad: number;
	public inventariocantidadoriginal: number;
	public inventariocantidadactual: number;
	public inventarioimagen: number[];
	public inventariofechacreacion: Date;
	public inventariofechamodificacion: Date;

	constructor (inventarioid_: number,compraid_: number,tipoproductoid_: number,inventarioactivo_: boolean,inventariocostoporunidad_: number,inventariocantidadoriginal_: number,inventariocantidadactual_: number,inventarioimagen_: number[],inventariofechacreacion_: Date,inventariofechamodificacion_: Date)
	{
		this.inventarioid = inventarioid_;
		this.compraid = compraid_;
		this.tipoproductoid = tipoproductoid_;
		this.inventarioactivo = inventarioactivo_;
		this.inventariocostoporunidad = inventariocostoporunidad_;
		this.inventariocantidadoriginal = inventariocantidadoriginal_;
		this.inventariocantidadactual = inventariocantidadactual_;
		this.inventarioimagen = inventarioimagen_;
		this.inventariofechacreacion = inventariofechacreacion_;
		this.inventariofechamodificacion = inventariofechamodificacion_;
	}
}