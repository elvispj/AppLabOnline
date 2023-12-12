export class Estudioinsumos
{
	public estudioinsumoid: number;
	public estudioid: number;
	public inventarioid: number;
	public estudioinsumoactivo: boolean;
	public estudioinsumocantidad: number;
	public estudioinsumofechacreacion: Date;
	public estudioinsumofechamodificacion: Date;
	public bitacoraid: number;

	constructor (estudioinsumoid_: number,estudioid_: number,inventarioid_: number,estudioinsumoactivo_: boolean,estudioinsumocantidad_: number,estudioinsumofechacreacion_: Date,estudioinsumofechamodificacion_: Date,bitacoraid_: number)
	{
		this.estudioinsumoid = estudioinsumoid_;
		this.estudioid = estudioid_;
		this.inventarioid = inventarioid_;
		this.estudioinsumoactivo = estudioinsumoactivo_;
		this.estudioinsumocantidad = estudioinsumocantidad_;
		this.estudioinsumofechacreacion = estudioinsumofechacreacion_;
		this.estudioinsumofechamodificacion = estudioinsumofechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}